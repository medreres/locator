export const getLocation = async (lat: string, long: string) => {

    return fetch(`http://localhost:3000/location?longtitude=${long}&latitude=${lat}`)
        .then(response => response.json())
        .then(result => result)
        .catch(err => console.log(err))
}