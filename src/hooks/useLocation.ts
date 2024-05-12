import { Country, State, City } from "country-state-city";
import { getAllStates } from "country-state-city/lib/state";
const useLocation = () => {
    const getCountryByCode = (countryCode: string) => {
        return Country.getAllCountries().find(
            (country) => country.isoCode === countryCode
        );
    };

    const getCodeCountryByName = (countryName: string) => {
        const countryObj = Country.getAllCountries().find(
            (country) => country.name === countryName
        );
        if (!countryObj) return null;
        return countryObj.isoCode;
    };

    const getCodeStateByName = (stateName: string) => {
        const stateObj = State.getAllStates().find(
            (state) => state.name === stateName
        );
        if (!stateObj) return null;

        return stateObj.isoCode;
    };

    const getStateByCode = (countryCode: string, stateCode: string) => {
        const state = State.getAllStates().find(
            (state) =>
                state.countryCode === countryCode && state.isoCode === stateCode
        );

        if (!state) return null;

        return state;
    };

    const getCountryStates = (countryCode: string) => {
        return State.getAllStates().filter(
            (state) => state.countryCode === countryCode
        );
    };

    const getStateCities = (countryCode: string, stateCode?: string) => {
        return City.getAllCities().filter(
            (city) =>
                city.countryCode === countryCode && city.stateCode === stateCode
        );
    };

    const getLatitudeLongitude = (
        countryName: string,
        stateName?: string,
        cityName?: string
    ) => {
        console.log(countryName);
        console.log(stateName);
        if (countryName && stateName && cityName) {
            const city = City.getCitiesOfState(countryName, stateName).find(
                (city) => city.name === cityName
            );
            if (!city) return null;
            return { latitude: city.latitude, longitude: city.longitude };
        }
        if (stateName) {
            console.log(stateName);
            const state = State.getStatesOfCountry(countryName).find(
                (state) => state.isoCode === stateName
            );
            if (!state) return null;
            return { latitude: state.latitude, longitude: state.longitude };
        }

        const country = Country.getAllCountries().find(
            (country) => country.isoCode === countryName
        );
        console.log(country);
        if (!country) return null;
        return { latitude: country.latitude, longitude: country.longitude };
    };

    return {
        getAllCountries: Country.getAllCountries,
        getCountryByCode,
        getCodeCountryByName,
        getCodeStateByName,
        getStateByCode,
        getCountryStates,
        getStateCities,
        getLatitudeLongitude,
    };
};

export default useLocation;
