import FeaturedRoom from "@/components/layouts/FeaturedRoom";

import Intro from "@/components/layouts/Intro";
import Service from "@/components/layouts/Service";
import Slider from "@/components/layouts/Slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Slider />
            <Intro />
            <FeaturedRoom />
            <Service />
        </div>
    );
}
