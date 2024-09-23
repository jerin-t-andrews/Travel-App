import { Input } from "@/components/ui/input"

export default function PackageList() {
    return (
        <div>
            <div className="flex w-full h-[40vh] bg-[#FAF9F6] pt-10 justify-center items-center relative">
                <h2 className="text-4xl font-semibold mb-[20vh]">Find Packages Now</h2>
                <div className="absolute w-[35%] h-8 bg-[#d1cfc9] rounded-full flex items-center px-4">
                    <img
                    className="w-5 h-5"
                    src="search_icon.png"
                    alt=""
                    />
                    <Input className="outline-none border-none p-3">
                    </Input>
                </div>
            </div>
        </div>
    )
}