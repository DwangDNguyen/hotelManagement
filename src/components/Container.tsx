import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[1920px] mx-auto w-full xl:px-20 px-4 py-4 shadow-[0px_5px_15px_rgb(15,36,84/5%)] fixed top-0 left-0 z-[999] bg-white">
            {children}
        </div>
    );
};

export default Container;
