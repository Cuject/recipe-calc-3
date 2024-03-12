export const load = async (loadEvent) => {
    const { fetch } = loadEvent;
    const response = await fetch('/api/fct')
    const fct = await response.json()

    return{
        fct
    }
}