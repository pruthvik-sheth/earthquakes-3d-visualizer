

export const filterTo7Days = (earthquakes) => {

    let seventhDay = new Date()
    seventhDay.setDate(seventhDay.getDate() - 7)


    const filteredEarthquakes = earthquakes.filter(
        (earthquake) => {
            return new Date(earthquake.time) >= seventhDay.getTime()
        }
    )

    return filteredEarthquakes
}

export const filterToPastDay = (earthquakes) => {

    let pastDay = new Date()
    pastDay.setDate(pastDay.getDate() - 1)


    const filteredEarthquakes = earthquakes.filter(
        (earthquake) => {
            return new Date(earthquake.time) >= pastDay.getTime()
        }
    )

    return filteredEarthquakes
}