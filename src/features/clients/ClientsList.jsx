export const ClientsList = ({ pages }) => {
    if (pages.length === 2) {
        return <div>Clients list content</div>
    }
    return <div>Client {pages[2]} details content.</div>
}