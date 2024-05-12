"use client";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from "../ui/select";

import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";
import { RotateCcw } from "lucide-react";
const Filter = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get("title");
    const [searchValue, setSearchValue] = useState(title || "");
    const [country, setCountry] = useState("");
    const [states, setStates] = useState<IState[]>([]);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [cities, setCities] = useState<ICity[]>([]);

    const pathname = usePathname();
    const router = useRouter();

    const {
        getAllCountries,
        getCountryStates,
        getStateCities,
        getCodeCountryByName,
        getCodeStateByName,
    } = useLocation();
    const countries = getAllCountries();

    const debounceValue = useDebounceValue<string>(searchValue);

    useEffect(() => {
        if (searchValue === "") {
            const query = {
                title: "",
            };
            const url = qs.stringifyUrl(
                {
                    url: window.location.href,
                    query,
                },
                { skipNull: true, skipEmptyString: true }
            );
            router.push(url);
        }
    }, [searchValue, router]);

    useEffect(() => {
        const selectedCountry = country;
        const countryCode = getCodeCountryByName(selectedCountry);

        const stateCode = getCodeStateByName(state || "");
        const stateCities = getStateCities(countryCode || "", stateCode || "");
        const countryStates = getCountryStates(countryCode || "");
        if (countryStates) {
            setStates(countryStates);
        }
        if (stateCities) {
            setCities(stateCities);
        }
    }, [country, state]);
    useEffect(() => {
        if (country) {
            setState("");
            setCity("");
        }
    }, [country]);
    useEffect(() => {
        if (state) {
            setCity("");
        }
    }, [state]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        const query: { [key: string]: string } = {
            title: debounceValue,
            country: country,
            state: state,
            city: city,
        };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    };

    const resetFilter = () => {
        setCountry("");
        setState("");
        setCity("");
        setSearchValue("");

        router.push("/hotels");
    };

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="">
                <div className="flex flex-col">
                    <Input
                        type="text"
                        value={searchValue}
                        onChange={onChange}
                        placeholder="Search..."
                        className="w-full p-[10px] border-[1px] border-solid border-[#e0e0e0] rounded-[5px] text-[14px] font-barlow !focus:border-[#aa8453]"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between w-full flex-wrap gap-5">
                <div className="flex items-center gap-2">
                    <label htmlFor="minPrice" className="text-[10px] font-bold">
                        Country
                    </label>
                    <Select
                        onValueChange={(value) => setCountry(value)}
                        value={country}
                    >
                        <SelectTrigger className="bg-white w-[130px]">
                            <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {countries.map((country) => {
                                return (
                                    <SelectItem
                                        key={country.isoCode}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="minPrice" className="text-[10px] font-bold">
                        State
                    </label>
                    <Select
                        onValueChange={(value) => setState(value)}
                        value={state}
                    >
                        <SelectTrigger className="bg-white w-[130px]">
                            <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {states.map((state) => {
                                return (
                                    <SelectItem
                                        key={state.isoCode}
                                        value={state.name}
                                    >
                                        {state.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="minPrice" className="text-[10px] font-bold">
                        City
                    </label>
                    <Select
                        onValueChange={(value) => setCity(value)}
                        value={city}
                    >
                        <SelectTrigger className="bg-white w-[130px]">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {cities.map((city) => {
                                return (
                                    <SelectItem
                                        key={city.name}
                                        value={city.name}
                                    >
                                        {city.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={() => handleSearch()}>
                        <FaSearch />
                    </Button>
                    <Button onClick={() => resetFilter()}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
