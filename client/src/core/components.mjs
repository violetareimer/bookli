const components = {};

function noop() {}

function render(definition, props={}) {
    let tmpl = definition.template;

    Object.keys(props).forEach(function replaceProp(prop) {
        const value = props[prop] || "";
        tmpl = tmpl.replace(`{{props.${prop}}}`, value, 'g');
    });

    return tmpl;
}

function makeComponent(name, definition) {
    function RootElement(props) {
        const el = Reflect.construct(HTMLElement, [], RootElement);

        // Crearon con new
        if (props) {
            Object.keys(props).forEach(function addPropToAttr(prop) {
                el.setAttribute(prop, props[prop]);
            });
        }

        return el;
    }

    const proto = RootElement.prototype;
    Object.setPrototypeOf(proto, HTMLElement.prototype);
    Object.setPrototypeOf(RootElement, HTMLElement);

    proto.connectedCallback = function onConnect() {
        const comp = {
            el: this,
            state: {}
        };

        let attrs = Array.from(this.attributes || [])

        comp.state = Object.keys(definition.props || {})
            .reduce(function parseProps(props, prop) {
                const type = definition.props[prop] || String;
                const attr = attrs.find(a => a.name === prop);
                if (!attr) { return props; }

                if (type === Array) {
                    props[attr.name] = attr.value.split(',');
                } else {
                    props[attr.name] = type(attr.value);
                }
                return props
            }, {});

        this.state = comp.state;

        this.innerHTML = definition.render
            ? definition.render(comp.state)
            : render(definition, comp.state);

        const onUpdate = definition.mounted ? definition.mounted.bind(comp) : noop;

        Promise.resolve().then(onUpdate);
    }

    window.customElements.define(`b-${name}`, RootElement);
    return RootElement;
}

async function registComponent(name) {
    if (components[name]) {
        return components[name];
    }

    const definition = await loadComponent(name);

    const component = makeComponent(name, definition);
    components[name] = component;
    return component;
}

async function loadChunk(url) {
    const resp = await fetch(url);
    const content = await resp.text();
    return content;
}

async function loadComponent(name) {
    let componentDefinition;

    try {
        const definition = await import(`/components/${name}/${name}.mjs`);
        componentDefinition = definition.default;
    } catch (e) {
        console.error(`Failed to load component ${name}`);
    }

    try {
        const styles = await loadChunk(`/components/${name}/${name}.css`);

        const $style = document.createElement('style');
        $style.innerText = styles;
        document.body.appendChild($style);
    } catch (e) {
        console.warn(`Component ${name} without styles`);
    }

    if (!componentDefinition.render) {
        try {
            const template = await loadChunk(`/components/${name}/${name}.html`);
            componentDefinition.template = template;
        } catch (e) {
            if (!componentDefinition.render) {
                console.warn(`Component ${name} without template`);
            }
        }
    }

    return componentDefinition;
}

export { loadChunk, render, makeComponent, registComponent }
export default { registComponent }
