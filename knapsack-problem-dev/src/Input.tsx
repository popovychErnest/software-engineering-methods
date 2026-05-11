import { useState,  type SubmitEvent } from "react";

interface InputProps {
    setWeights: React.Dispatch<React.SetStateAction<number[]>>;
    setValues: React.Dispatch<React.SetStateAction<number[]>>;
    setKnapsackWeight: React.Dispatch<React.SetStateAction<number>>;
    setDp: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const Input = ({
    setWeights,
    setValues,
    setKnapsackWeight,
    setDp
}: InputProps) => {

    const [inputWeights, setInputWeights] = useState<string>("");
    const [inputValues, setInputValues] = useState<string>("");
    const [inputCapacity, setInputCapacity] = useState<string>("");

    const [errors, setErrors] = useState<string[]>([]);

    const parseArray = (data: string): number[] | null => {

        const trimmed = data.trim();
        if (
            !trimmed.startsWith("[") ||
            !trimmed.endsWith("]")
        ) {
            return null;
        }
        const parsed = trimmed
            .slice(1, -1)
            .split(",")
            .map(el => Number(el.trim()));

        const hasNaN = parsed.some(num => Number.isNaN(num));

        if (hasNaN) return null;

        return parsed;
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: string[] = [];

        const parsedValues = parseArray(inputValues);
        const parsedWeights = parseArray(inputWeights);
        const parsedCapacity = Number(inputCapacity);

        // validation

        if (!parsedValues) {
            newErrors.push("Incorrect values array format");
        }

        if (!parsedWeights) {
            newErrors.push("Incorrect weights array format");
        }

        if (Number.isNaN(parsedCapacity)) {
            newErrors.push("Knapsack weight must be a number");
        }

        if (
            parsedValues &&
            parsedWeights &&
            parsedValues.length !== parsedWeights.length
        ) {
            newErrors.push("Values and weights length mismatch");
        }

        setErrors(newErrors);

        if (newErrors.length > 0) return;

        // state update in Main.tsx

        setValues(parsedValues!);
        setWeights(parsedWeights!);
        setKnapsackWeight(parsedCapacity);
        if (parsedValues && parsedWeights) {
            setDp(Array.from({length: parsedWeights.length + 1}, () => Array(parsedCapacity + 1).fill(0)))
        }
    };

    return (
        <div className="w-[40rem] min-h-[20rem] p-6 rounded-2xl bg-neutral-700">

            <form
                 onSubmit={handleSubmit} 
                 className="flex flex-col gap-5">

                {/* VALUES */}

                <div className="flex flex-col gap-2">
                     <label htmlFor="values" className="text-white"> 
                         Enter values array:
                    </label> 

                    <input
                    autoComplete="off"
                        value={inputValues}
                        onChange={(e) => setInputValues(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-500 text-white outline-none border border-transparent focus:border-white"
                        type="text"
                        name = "values"
                        placeholder="[7,15,15,11]"
                    />
                </div>

                {/* WEIGHTS */}

                <div className="flex flex-col gap-2">
                    <label className="text-white">
                        Enter weights array:
                    </label> 

                    <input
                    autoComplete="off"
                        value={inputWeights}
                        onChange={(e) => setInputWeights(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-500 text-white outline-none  focus:border-white"
                        type="text"
                        placeholder="[3,10,1,4]"
                    />
                </div>

                {/* CAPACITY */}

                <div className="flex flex-col gap-2">
                    <label className="text-white">
                        Enter knapsack capacity:
                    </label> 

                    <input
                    autoComplete="off"
                        value={inputCapacity}
                        onChange={(e) => setInputCapacity(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-neutral-500 text-white"
                        placeholder="18"
                    />
                </div>

                {/* ERRORS */}

                {errors.length > 0 && (
                    <div className="rounded-xl bg-red-500/20 border border-red-500 p-4">
                        <ul className="text-red-300 space-y-1">
                            {errors.map((err, index) => (
                                <li key={index}>
                                    • {err}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* BUTTON */}

                <button
                    type="submit"
                    className="rounded-xl bg-white text-black font-semibold py-3 hover:opacity-80 transition"
                >
                    Run
                </button> 

            </form>
        </div>
    );
};
