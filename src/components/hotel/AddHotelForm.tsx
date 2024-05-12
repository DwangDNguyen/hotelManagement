"use client";
import { Booking, Hotel, HotelImages, Room } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { ICity, IState } from "country-state-city";
import useLocation from "@/hooks/useLocation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Delete,
    Loader2,
    Pencil,
    PencilIcon,
    PencilLine,
    Terminal,
    Trash2,
    XCircle,
} from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AddRoomForm from "../room/AddRoomForm";
import RoomCard from "../room/RoomCard";

interface AddHotelFormProps {
    hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
    rooms: Room[];
} & {
    images: HotelImages[];
} & {
    bookings: Booking[];
};

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long",
    }),
    country: z.string().min(1, {
        message: "Country is required",
    }),
    images: z
        .array(
            z.object({
                id: z.string(),
                url: z.string(),
            })
        )
        .min(1, {
            message: "Images are required",
        }),
    state: z.string().optional(),
    city: z.string().optional(),
    locationDescription: z.string().min(10, {
        message: "Description must be at least 10 characters long",
    }),
    longitude: z.string().optional(),
    latitude: z.string().optional(),
    gym: z.boolean().optional(),
    spa: z.boolean().optional(),
    bar: z.boolean().optional(),
    laundry: z.boolean().optional(),
    restaurant: z.boolean().optional(),
    shopping: z.boolean().optional(),
    freeParking: z.boolean().optional(),
    bikeRental: z.boolean().optional(),
    freeWifi: z.boolean().optional(),
    movieNights: z.boolean().optional(),
    swimmingPool: z.boolean().optional(),
    coffeeShop: z.boolean().optional(),
});

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [imageIsDeleting, setImageIsDeleting] = useState<boolean>(false);
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);
    const [location, setLocation] = useState({
        country: hotel?.country || "" || undefined,
        state: hotel?.state || "" || undefined,
        city: hotel?.city || "" || undefined,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [locatedHotel, setLocatedHotel] = useState({
        latitude: hotel?.latitude || "",
        longitude: hotel?.longitude || "",
    });

    const params = useParams();

    const { toast } = useToast();
    const {
        getAllCountries,
        getCodeCountryByName,
        getCodeStateByName,
        getCountryStates,
        getStateCities,
        getLatitudeLongitude,
    } = useLocation();
    const countries = getAllCountries();
    console.log(images);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: hotel || {
            title: "",
            description: "",
            country: "",
            state: "",
            city: "",
            images: [],
            locationDescription: "",
            longitude: "",
            latitude: "",
            gym: false,
            spa: false,
            bar: false,
            laundry: false,
            restaurant: false,
            shopping: false,
            freeParking: false,
            bikeRental: false,
            freeWifi: false,
            movieNights: false,
            swimmingPool: false,
            coffeeShop: false,
        },
    });

    useEffect(() => {
        console.log(images);
        setImages(hotel?.images.map((image) => image.url) || []);
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            setHasImage(true);
        } else {
            setHasImage(false);
        }
        const fileUrl = images.map((image, index) => ({
            id: image,
            url: image,
        }));
        console.log("fileUrl: " + JSON.stringify(fileUrl));
        if (images.length > 0) {
            form.setValue("images", fileUrl, {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    }, [images, hasImage, form]);

    useEffect(() => {
        if (hotel) {
            form.setValue("state", hotel?.state || "", {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
            });
            form.setValue("city", hotel?.city || "", {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    }, [form.watch("country")]);

    useEffect(() => {
        const selectedCountry = form.watch("country");
        const selectedState = form.watch("state");
        const countryCode = getCodeCountryByName(selectedCountry);

        const stateCode = getCodeStateByName(selectedState || "");
        const stateCities = getStateCities(countryCode || "", stateCode || "");
        const countryStates = getCountryStates(countryCode || "");
        if (countryStates) {
            setStates(countryStates);
        }
        if (stateCities) {
            setCities(stateCities);
        }
    }, [form.watch("country"), form.watch("state")]);

    useEffect(() => {
        const selectedCountry = form.watch("country");
        const selectedState = form.watch("state");
        const selectedCity = form.watch("city");
        const countryCode = getCodeCountryByName(selectedCountry);

        const stateCode = getCodeStateByName(selectedState || "");
        setLocation({
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
        });

        if (selectedCountry) {
            console.log(selectedState);
            const locate = getLatitudeLongitude(
                countryCode || "",
                stateCode || "",
                selectedCity
            );

            if (locate) {
                setLocatedHotel({
                    latitude: locate.latitude ?? "",
                    longitude: locate.longitude ?? "",
                });
            }
        }
    }, [form.watch("country"), form.watch("state"), form.watch("city")]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsLoading(true);
        if (hotel) {
            //update
            axios
                .patch(`/api/hotel/${params.hotelId}`, {
                    ...values,
                    longitude: locatedHotel.longitude,
                    latitude: locatedHotel.latitude,
                })
                .then((res) => {
                    console.log(res);
                    toast({
                        variant: "success",
                        description: "Hotel updated successfully",
                    });
                    router.push("/hotel/" + res.data.id);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        variant: "error",
                        description: "Something went wrong",
                    });
                    setIsLoading(false);
                });
        } else {
            //create
            axios
                .post("/api/hotel", {
                    ...values,
                    longitude: locatedHotel.longitude,
                    latitude: locatedHotel.latitude,
                })
                .then((res) => {
                    console.log(res);
                    toast({
                        variant: "success",
                        description: "Hotel created successfully",
                    });
                    router.push("/hotel/" + res.data.id);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        variant: "error",
                        description: "Something went wrong",
                    });
                    setIsLoading(false);
                });
        }
    }

    // const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newImages = e.target.files;
    //     if (newImages) {
    //         const filesArray = Array.from(newImages) as File[];
    //         setImages((prevImages) => [...prevImages, ...filesArray]);
    //     }
    //     // setImages((prev) => [...prev, ...newImages]);
    // };

    // const handleDragImages = (result: any) => {
    //     if (!result.destination) return;
    //     const items = Array.from(images);
    //     const [reorderedItem] = items.splice(result.source.index, 1);

    //     items.splice(result.destination.index, 0, reorderedItem);

    //     setImages(items);
    // };

    const handleRemovePhoto = (indexToRemove: number) => {
        if (hasImage) {
            setLoadingIndexes((prevIndexes) => [...prevIndexes, indexToRemove]);
        }
        setImageIsDeleting(true);
        const imageKey = images[indexToRemove].substring(
            images[indexToRemove].lastIndexOf("/") + 1
        );

        axios
            .post("/api/uploadthing/delete", { imageKey })
            .then((res) => {
                if (res.data.success) {
                    setImages([
                        ...images.slice(0, indexToRemove),
                        ...images.slice(indexToRemove + 1),
                    ]);
                    toast({
                        variant: "success",
                        description: "Image deleted successfully",
                    });
                }
            })
            .catch((err) => {
                toast({
                    variant: "error",
                    description: "Something went wrong, please try again",
                });
            })
            .finally(() => {
                setImageIsDeleting(false);
            });
    };

    const handleDeleteHotel = async (hotelId: string) => {
        setIsLoadingDelete(true);

        try {
            const imageKey = images.map((image) =>
                image.substring(image.lastIndexOf("/") + 1)
            );
            await axios.post("/api/uploadthing/delete", { imageKey });

            await axios.delete(`/api/hotel/${hotelId}`);
            toast({
                variant: "success",
                description: "Hotel deleted successfully",
            });
            setIsLoadingDelete(false);
            router.push("/hotel/new");
        } catch (e) {
            console.log(e);
            toast({
                variant: "error",
                description: "Something went wrong, please try again",
            });
        }
    };

    const handleDialogueOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="max-w-[1920px] mx-auto w-full xl:px-20 py-[120px] bg-white font-barlow">
                    <div className="flex  gap-6">
                        <div className="flex-1 flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormDescription>
                                            The title of the hotel
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your title"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormDescription>
                                            The description of the hotel
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your description"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormLabel>Choose Amenities</FormLabel>
                                <FormDescription>
                                    Choose Amenities popular in your hotel
                                </FormDescription>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                    <FormField
                                        control={form.control}
                                        name="gym"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>Gym</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="spa"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>Spa</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bar"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>Bar</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="laundry"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>Laundry</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="restaurant"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Restaurant
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="shopping"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>Shopping</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="freeParking"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Free Parking
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bikeRental"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Bike Rental
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="freeWifi"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>Free Wifi</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="movieNights"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Movie Nights
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="swimmingPool"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Swimming Pool
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="coffeeShop"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Coffee Shop
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upload images *</FormLabel>
                                        <FormDescription>
                                            Choose images that will show-case
                                            your hotel nicely
                                        </FormDescription>
                                        <FormControl>
                                            {images.length > 0 ? (
                                                <>
                                                    <div className=" grid items-center grid-cols-3 gap-5 max-w-[100%] min-w-[200px] mt-4">
                                                        {images.map(
                                                            (image, index) => (
                                                                <div className="relative aspect-square overflow-hidden h-[200px] rounded-lg">
                                                                    <Image
                                                                        fill
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt={
                                                                            image
                                                                        }
                                                                        className="object-cover"
                                                                    />
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleRemovePhoto(
                                                                                index
                                                                            )
                                                                        }
                                                                        type="button"
                                                                        size="icon"
                                                                        variant="ghost"
                                                                        className="absolute right-0 top-0"
                                                                    >
                                                                        {imageIsDeleting &&
                                                                        loadingIndexes.includes(
                                                                            index
                                                                        ) ? (
                                                                            <Loader2
                                                                                className="h-4 w-4 animate-spin"
                                                                                id="loader"
                                                                            />
                                                                        ) : (
                                                                            <XCircle />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                                                        <UploadButton
                                                            endpoint="imageUploader"
                                                            onClientUploadComplete={(
                                                                res
                                                            ) => {
                                                                // Do something with the response
                                                                console.log(
                                                                    "Files: ",
                                                                    res
                                                                );
                                                                const newImages =
                                                                    res.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) =>
                                                                            item.url
                                                                    );
                                                                setImages(
                                                                    newImages
                                                                );

                                                                console.log(
                                                                    images
                                                                );
                                                            }}
                                                            onUploadError={(
                                                                error: Error
                                                            ) => {
                                                                // Do something with the error.
                                                                alert(
                                                                    `ERROR! ${error.message}`
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upload images *</FormLabel>
                                        <FormDescription>
                                            Choose images that will show-case
                                            your hotel nicely
                                        </FormDescription>
                                        <FormControl>
                                            <DragDropContext
                                                onDragEnd={handleDragImages}
                                            >
                                                <Droppable
                                                    droppableId="images"
                                                    direction="horizontal"
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className="flex flex-wrap gap-[15px]"
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                        >
                                                            {images.length <
                                                                1 && (
                                                                <>
                                                                    <input
                                                                        id="images"
                                                                        name="images"
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={
                                                                            handleUploadImages
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor="images"
                                                                        className=" flex flex-col justify-center items-center cursor-pointer border-[1px] border-dashed border-[#e0e0e0]  py-[50px] px-[50px] rounded-[10px]"
                                                                    >
                                                                        <IoIosImages className="text-[40px]" />
                                                                        <p className="font-semibold text-center">
                                                                            Upload
                                                                            from
                                                                            your
                                                                            device
                                                                        </p>
                                                                    </label>
                                                                </>
                                                            )}
                                                            {images.length >=
                                                                1 && (
                                                                <>
                                                                    {images.map(
                                                                        (
                                                                            photo,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <Draggable
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    draggableId={index.toString()}
                                                                                    index={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {(
                                                                                        provided
                                                                                    ) => (
                                                                                        <div
                                                                                            className="relative w-[250px] h-[150px] cursor-move"
                                                                                            ref={
                                                                                                provided.innerRef
                                                                                            }
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                        >
                                                                                            <Image
                                                                                                src={URL.createObjectURL(
                                                                                                    photo
                                                                                                )}
                                                                                                width={
                                                                                                    0
                                                                                                }
                                                                                                height={
                                                                                                    0
                                                                                                }
                                                                                                alt={
                                                                                                    photo.name
                                                                                                }
                                                                                                className="w-full h-full rounded-lg object-cover"
                                                                                            />
                                                                                            <div
                                                                                                className="absolute top-0 right-0 p-[10px] border-none bg-white bg-opacity-80 text-[20px] cursor-pointer  z-[1] "
                                                                                                onClick={() =>
                                                                                                    handleRemovePhoto(
                                                                                                        index
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <BiTrash />
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            );
                                                                        }
                                                                    )}
                                                                    <input
                                                                        id="images"
                                                                        name="images"
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={
                                                                            handleUploadImages
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor="images"
                                                                        className=" flex flex-col justify-center items-center cursor-pointer border-[1px] border-dashed border-[#e0e0e0]  py-[50px] px-[100px] rounded-[10px]"
                                                                    >
                                                                        <IoIosImages className="text-[40px]" />
                                                                        <p className="font-semibold text-center">
                                                                            Upload
                                                                            from
                                                                            your
                                                                            device
                                                                        </p>
                                                                    </label>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                        </FormControl>
                                        {hasImage === false && <FormMessage />}
                                    </FormItem>
                                )}
                            /> */}
                            {/* <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Upload images *
                            </label> */}
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Select Country *
                                            </FormLabel>
                                            <FormDescription>
                                                In which country is your
                                                property located?
                                            </FormDescription>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="bg-background">
                                                    <SelectValue
                                                        placeholder="Select a Country"
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map(
                                                        (country) => {
                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        country.isoCode
                                                                    }
                                                                    value={
                                                                        country.name
                                                                    }
                                                                >
                                                                    {
                                                                        country.name
                                                                    }
                                                                </SelectItem>
                                                            );
                                                        }
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select State</FormLabel>
                                            <FormDescription>
                                                In which state is your property
                                                located?
                                            </FormDescription>
                                            <Select
                                                disabled={
                                                    isLoading ||
                                                    states.length < 1
                                                }
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="bg-background">
                                                    <SelectValue
                                                        placeholder="Select a State"
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {states.map((state) => {
                                                        return (
                                                            <SelectItem
                                                                key={
                                                                    state.isoCode
                                                                }
                                                                value={
                                                                    state.name
                                                                }
                                                            >
                                                                {state.name}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select City</FormLabel>
                                        <FormDescription>
                                            In which town/city is your property
                                            located?
                                        </FormDescription>
                                        <Select
                                            disabled={
                                                isLoading || cities.length < 1
                                            }
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="bg-background">
                                                <SelectValue
                                                    placeholder="Select a City"
                                                    defaultValue={field.value}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="locationDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Location Description
                                        </FormLabel>
                                        <FormDescription>
                                            Provide a detailed location
                                            description of your hotel
                                        </FormDescription>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Located at the very end of the beach road"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {hotel && !hotel.rooms.length && (
                                <Alert className="bg-[#aa8453]">
                                    <Terminal className=" mr-2 h-4 w-4 !text-white" />
                                    <AlertTitle className="font-barlow text-white">
                                        One last step!
                                    </AlertTitle>
                                    <AlertDescription className="font-barlow text-white">
                                        Your hotel was created successfully 🔥
                                        <div>
                                            Please add some rooms to complete
                                            your hotel setup!
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}
                            <div className="flex justify-between gap-2 flex-wrap">
                                {hotel ? (
                                    <div className="flex items-center gap-5">
                                        {hotel && (
                                            <Dialog
                                                open={open}
                                                onOpenChange={setOpen}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button>+ Add Room</Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-[900px] w-[90%] max-h-[50vh] overflow-y-auto px-10 ">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Add a room
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Add details about a
                                                            room in your hotel.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <AddRoomForm
                                                        hotel={hotel}
                                                        handleDialogueOpen={
                                                            handleDialogueOpen
                                                        }
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleDeleteHotel(hotel.id)
                                            }
                                        >
                                            {isLoadingDelete ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Deleting
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            className="max-w-[150px] bg-main hover:bg-main/90"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Updating
                                                </>
                                            ) : (
                                                <>
                                                    <PencilLine className="mr-2 h-4 w-4" />
                                                    Update
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <Button>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4" />
                                                Creating
                                            </>
                                        ) : (
                                            <>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Create Hotel
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                            {hotel && !!hotel.rooms.length && (
                                <div>
                                    <Separator />
                                    <h3 className="text-lg font-barlow my-4">
                                        Hotel Rooms
                                    </h3>
                                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                                        {hotel.rooms.map((room) => (
                                            <RoomCard
                                                key={room.id}
                                                room={room}
                                                hotel={hotel}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default AddHotelForm;
