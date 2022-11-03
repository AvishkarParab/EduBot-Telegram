async function getData(statecode){
    let url = "https://data.covid19india.org/data.json";
    try {
        const resp = await axios.get(url);
        let stateArr = resp.data.statewise;
        let dataState = stateArr.filter((elem) =>{return elem.statecode == statecode})
        let cases = dataState[0]

        let result = `Cases in ${cases.state}
            Confirmed Cases: ${cases.confirmed}
            Active Cases: ${cases.active}
            Recovered Cases: ${cases.recovered}
        `
        return result;
        // console.log(cases.active);

    } catch (error) {
        console.log(error);
    }
    
}