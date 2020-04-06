export default {
    props: {
        authors: Array
    },
    render: function (props) {
        return `<p class="book__author">by ${ props.authors.join(', ') }</p>`
    }
}
