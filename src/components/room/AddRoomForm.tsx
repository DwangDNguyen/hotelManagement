"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, HotelImages, Room } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "../ui/checkbox";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2, Pencil, PencilLine, XCircle } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

interface AddRoomFormProps {
    hotel?: Hotel & {
        rooms: Room[];
        images: HotelImages[];
    };
    room?: Room;
    handleDialogueOpen: () => void;
}

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long",
    }),

    bedCount: z.coerce.number().min(1, {
        message: "Bed count must be at least 1",
    }),
    guestCount: z.coerce.number().min(1, {
        message: "Guest count must be at least 1",
    }),
    bathroomCount: z.coerce.number().min(1, {
        message: "Bathroom count must be at least 1",
    }),
    price: z.coerce.number().min(1, {
        message: "Price must be at least 1",
    }),
    image: z.string().min(1, {
        message: "Image is required",
    }),
    roomService: z.boolean().optional(),
    TV: z.boolean().optional(),
    balcony: z.boolean().optional(),
    freeWifi: z.boolean().optional(),
    cityView: z.boolean().optional(),
    oceanView: z.boolean().optional(),
    forestView: z.boolean().optional(),
    mountainView: z.boolean().optional(),
    airCondition: z.boolean().optional(),
    soundProofed: z.boolean().optional(),
});

const AddRoomForm = ({ hotel, room, handleDialogueOpen }: AddRoomFormProps) => {
    const [image, setImage] = useState<string | undefined>(room?.image);
    const [imageIsDeleting, setImageIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: room || {
            title: "",
            description: "",
            bedCount: 0,
            guestCount: 0,
            bathroomCount: 0,
            price: 0,
            image: "",
            roomService: false,
            TV: false,
            balcony: false,
            freeWifi: false,
            cityView: false,
            oceanView: false,
            forestView: false,
            mountainView: false,
            airCondition: false,
            soundProofed: false,
        },
    });

    useEffect(() => {
        if (typeof image === "string") {
            form.setValue("image", image, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
        }
    }, [image]);

    const handleImageDelete = (image: string) => {
        setImageIsDeleting(true);
        const imageKey = image.substring(image.lastIndexOf("/") + 1);

        axios
            .post("/api/uploadthing/delete", { imageKey })
            .then((res) => {
                if (res.data.success) {
                    setImage("");
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        setIsLoading(true);
        if (hotel && room) {
            //update
            console.log("values", values);
            console.log("hotel:", hotel);

            axios
                .patch(`/api/room/${room.id}`, values)
                .then((res) => {
                    console.log(res);
                    toast({
                        variant: "success",
                        description: "Room updated successfully",
                    });
                    router.refresh();
                    console.log(router);
                    console.log(isLoading);
                    setIsLoading(false);
                    handleDialogueOpen();
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
            if (!hotel) return;
            //create
            axios
                .post("/api/room", { ...values, hotelId: hotel.id })
                .then((res) => {
                    console.log(res);
                    toast({
                        variant: "success",
                        description: "Room created successfully",
                    });
                    router.refresh();
                    setIsLoading(false);
                    handleDialogueOpen();
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

    return (
        <div className="">
            <Form {...form}>
                <form className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormDescription>
                                    The title of the room
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
                                    The description of the room
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <FormLabel>Choose Room Amenities</FormLabel>
                        <FormDescription>
                            Choose Room Amenities popular in your room
                        </FormDescription>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <FormField
                                control={form.control}
                                name="roomService"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>
                                            24hrs Room Services
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="TV"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>TV</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="balcony"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Balcony</FormLabel>
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
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Free Wifi</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="oceanView"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Ocean View</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="forestView"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Forest View</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cityView"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>City View</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mountainView"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Mountain View</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="airCondition"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Air Condition</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="soundProofed"
                                render={({ field }) => (
                                    <FormItem className="flex flex-rows  items-end space-x-3 gap-2 rounded-md p-4 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Sound Proofed</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload image *</FormLabel>
                                <FormDescription>
                                    Choose image that will show-case your room
                                    nicely
                                </FormDescription>
                                <FormControl>
                                    {image ? (
                                        <>
                                            <div className="relative flex items-center justify-center mt-4">
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={image}
                                                    alt={image}
                                                    className="object-contain rounded"
                                                />
                                                <Button
                                                    onClick={() =>
                                                        handleImageDelete(image)
                                                    }
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="absolute right-[-12px] top-0"
                                                >
                                                    {imageIsDeleting ? (
                                                        <Loader2 />
                                                    ) : (
                                                        <XCircle />
                                                    )}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                                                <UploadButton
                                                    appearance={{
                                                        button: {
                                                            background:
                                                                "#aa8f68",
                                                            color: "#fff",
                                                            fontFamily:
                                                                "Barlow",
                                                        },
                                                    }}
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(
                                                        res
                                                    ) => {
                                                        // Do something with the response
                                                        console.log(
                                                            "Files: ",
                                                            res
                                                        );

                                                        setImage(res[0].url);
                                                        toast({
                                                            variant: "success",
                                                            description:
                                                                "🎉 Upload Completed",
                                                        });
                                                    }}
                                                    onUploadError={(
                                                        error: Error
                                                    ) => {
                                                        // Do something with the error.
                                                        toast({
                                                            variant: "error",
                                                            description: `ERROR! ${error.message}`,
                                                        });
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
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Room Price in USD *</FormLabel>
                                    <FormDescription>
                                        State the price for staying in this room
                                        for 24hrs
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bedCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bed Count *</FormLabel>
                                    <FormDescription>
                                        How many beds are available in this room
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={8}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guestCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Guest Count *</FormLabel>
                                    <FormDescription>
                                        How many guests are allowed in this room
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bathroomCount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bathroom Count *</FormLabel>
                                    <FormDescription>
                                        How many bathrooms are available in this
                                        room
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className=" pt-4 pb-2">
                        {room ? (
                            <Button
                                className="max-w-[150px] bg-[#aa8f68] hover:bg-[#aa8f68] text-white"
                                disabled={isLoading}
                                type="button"
                                onClick={form.handleSubmit(onSubmit)}
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
                        ) : (
                            <Button
                                className="max-w-[150px] bg-[#aa8f68] hover:bg-[#aa8f68] text-white"
                                onClick={form.handleSubmit(onSubmit)}
                                type="button"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating
                                    </>
                                ) : (
                                    <>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Create Room
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddRoomForm;
