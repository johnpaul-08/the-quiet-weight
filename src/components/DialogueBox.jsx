// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const DialogueBox = ({ scene, onComplete, noBackground = false }) => {

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isTyping, setIsTyping] = useState(false);
//     const [displayedText, setDisplayedText] = useState("");

//     useEffect(() => {
//         const fullText = scene.lines[currentIndex].text;
//         setDisplayedText("");
//         setIsTyping(true);

//         let i = 0;
//         const interval = setInterval(() => {
//             setDisplayedText(fullText.slice(0, i + 1));
//             i++;
//             if (i === fullText.length) {
//                 clearInterval(interval);
//                 setIsTyping(false);
//             }
//         }, 25);

//         return () => clearInterval(interval);
//     }, [currentIndex]);

//     const handleClick = () => {
//         if (isTyping) {
//             setDisplayedText(scene.lines[currentIndex].text);
//             setIsTyping(false);
//         } else {
//             if (currentIndex < scene.lines.length - 1) {
//                 setCurrentIndex(prev => prev + 1);
//             } else {
//                 onComplete();
//             }
//         }
//     };

//     const getSpeakerStyle = (speaker) => {
//         switch (speaker) {
//             case "avery": return { name: "Avery", color: "text-violet-400", align: "text-left" };
//             case "player": return { name: "You", color: "text-blue-400", align: "text-right" };
//             case "narration": return { name: null, color: "text-gray-400", align: "text-center italic" };
//         }
//     };

//     const characterSprites = {
//         avery: "/assets/characters/avery.png",
//         player: "/assets/characters/player.png",
//         narration: null
//     };

//     const currentLine = scene.lines[currentIndex];
//     const style = getSpeakerStyle(currentLine.speaker);

//     return (
//         <div
//             className="relative w-full h-screen flex flex-col justify-end cursor-pointer"
//             onClick={handleClick}
//         >

//             {/* Background — only if noBackground is false */}
//             {!noBackground && (
//                 <div
//                     className="absolute inset-0 bg-cover bg-center"
//                     style={{ backgroundImage: `url('/assets/backgrounds/${scene.background}.png')` }}
//                 />
//             )}

//             {/* Dark overlay — only if noBackground is false */}
//             {!noBackground && (
//                 <div className="absolute inset-0 bg-black/40" />
//             )}

//             {/* Character Sprite */}
//             {characterSprites[currentLine.speaker] && (
//                 <motion.div
//                     key={currentLine.speaker}
//                     initial={{ opacity: 0, x: currentLine.speaker === "player" ? 40 : -40 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className={`absolute bottom-44 z-10
//             ${currentLine.speaker === "player" ? "right-8" : "left-8"}`}
//                 >
//                     <img
//                         src={characterSprites[currentLine.speaker]}
//                         alt={currentLine.speaker}
//                         className="h-64 w-auto object-contain"
//                     />
//                 </motion.div>
//             )}

//             {/* Dialogue Box */}
//             <div className="relative z-10 m-6 rounded-2xl bg-black/70 backdrop-blur-sm border border-white/10 p-6 min-h-[160px]">

//                 {/* Speaker Name */}
//                 {style.name && (
//                     <p className={`text-sm font-semibold mb-2 ${style.color} ${style.align}`}>
//                         {style.name}
//                     </p>
//                 )}

//                 {/* Dialogue Text */}
//                 <motion.p
//                     key={currentIndex}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className={`text-white text-base leading-relaxed ${style.align} ${currentLine.speaker === "narration" ? "italic text-gray-300" : ""}`}
//                 >
//                     {displayedText}
//                 </motion.p>

//                 {/* Continue Indicator */}
//                 {!isTyping && (
//                     <motion.span
//                         className="absolute bottom-4 right-6 text-white/50 text-xs"
//                         animate={{ opacity: [1, 0, 1] }}
//                         transition={{ repeat: Infinity, duration: 1.2 }}
//                     >
//                         click to continue ▼
//                     </motion.span>
//                 )}

//                 {characterSprites["avery"] && (
//                     <motion.div
//                         animate={{
//                             opacity: currentLine.speaker === "avery" ? 1 : 0.4,
//                             scale: currentLine.speaker === "avery" ? 1 : 0.95
//                         }}
//                         transition={{ duration: 0.3 }}
//                         className="absolute bottom-36 left-4 z-10"  // bottom-36 sits just above dialogue box
//                     >
//                         <img
//                             src={characterSprites["avery"]}
//                             alt="avery"
//                             className="h-80 w-auto object-contain"  // h-80 instead of h-64
//                         />
//                     </motion.div>
//                 )}

//                 {characterSprites["player"] && (
//                     <motion.div
//                         animate={{
//                             opacity: currentLine.speaker === "player" ? 1 : 0.4,
//                             scale: currentLine.speaker === "player" ? 1 : 0.95
//                         }}
//                         transition={{ duration: 0.3 }}
//                         className="absolute bottom-36 right-4 z-10"
//                     >
//                         <img
//                             src={characterSprites["player"]}
//                             alt="player"
//                             className="h-80 w-auto object-contain"
//                         />
//                     </motion.div>
//                 )}

                

//             </div>
//         </div>
//     );
// };

// export default DialogueBox;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DialogueBox = ({ scene, onComplete, noBackground = false }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const fullText = scene.lines[currentIndex].text;
        setDisplayedText("");
        setIsTyping(true);

        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 25);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleClick = () => {
        if (isTyping) {
            setDisplayedText(scene.lines[currentIndex].text);
            setIsTyping(false);
        } else {
            if (currentIndex < scene.lines.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                onComplete();
            }
        }
    };

    const characterSprites = {
        avery:  "/assets/characters/avery.png",
        player: "/assets/characters/player.png",
    };

    const currentLine = scene.lines[currentIndex];
    const isNarration = currentLine.speaker === "narration";
    const isAvery = currentLine.speaker === "avery";
    const isPlayer = currentLine.speaker === "player";

    return (
        <div
            className="relative w-full h-screen flex flex-col justify-end cursor-pointer"
            onClick={handleClick}
        >

            {/* Background */}
            {!noBackground && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/assets/backgrounds/${scene.background}.png')` }}
                />
            )}

            {/* Dark overlay */}
            {!noBackground && (
                <div className="absolute inset-0 bg-black/40" />
            )}

            {/* Characters + Speech Bubbles */}
            {!isNarration && (
                <>
                    {/* Avery — left side */}
                    <div className="absolute bottom-0 left-8 z-10 flex flex-col items-start">

                        {/* Speech bubble above Avery */}
                        {isAvery && (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative mb-2 max-w-[220px]"
                            >
                                {/* Bubble */}
                                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
                                    <p className="text-violet-700 text-xs font-bold mb-1">Avery</p>
                                    <p className="text-gray-800 text-sm leading-relaxed">
                                        {displayedText}
                                    </p>
                                    {/* Continue dot */}
                                    {!isTyping && (
                                        <motion.span
                                            className="text-gray-400 text-xs"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.2 }}
                                        >
                                            ●
                                        </motion.span>
                                    )}
                                </div>
                                {/* Bubble tail pointing down-left */}
                                <div className="w-3 h-3 bg-white absolute -bottom-1.5 left-4 rotate-45 rounded-sm" />
                            </motion.div>
                        )}

                        {/* Avery sprite */}
                        <motion.img
                            src={characterSprites["avery"]}
                            alt="avery"
                            animate={{
                                opacity: isAvery ? 1 : 0.35,
                                scale:   isAvery ? 1 : 0.95
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-72 w-auto object-contain"
                        />
                    </div>

                    {/* Player — right side */}
                    <div className="absolute bottom-0 right-8 z-10 flex flex-col items-end">

                        {/* Speech bubble above Player */}
                        {isPlayer && (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative mb-2 max-w-[220px]"
                            >
                                {/* Bubble */}
                                <div className="bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg">
                                    <p className="text-blue-600 text-xs font-bold mb-1 text-right">You</p>
                                    <p className="text-gray-800 text-sm leading-relaxed text-right">
                                        {displayedText}
                                    </p>
                                    {!isTyping && (
                                        <motion.span
                                            className="text-gray-400 text-xs flex justify-end"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.2 }}
                                        >
                                            ●
                                        </motion.span>
                                    )}
                                </div>
                                {/* Bubble tail pointing down-right */}
                                <div className="w-3 h-3 bg-white absolute -bottom-1.5 right-4 rotate-45 rounded-sm" />
                            </motion.div>
                        )}

                        {/* Player sprite */}
                        <motion.img
                            src={characterSprites["player"]}
                            alt="player"
                            animate={{
                                opacity: isPlayer ? 1 : 0.35,
                                scale:   isPlayer ? 1 : 0.95
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-72 w-auto object-contain"
                        />
                    </div>
                </>
            )}

            {/* Narration — bottom bar only */}
            {isNarration && (
                <div className="relative z-10 m-6 rounded-2xl bg-black/70 backdrop-blur-sm border border-white/10 p-6 min-h-[120px]">
                    <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-300 text-base leading-relaxed text-center italic"
                    >
                        {displayedText}
                    </motion.p>
                    {!isTyping && (
                        <motion.span
                            className="absolute bottom-4 right-6 text-white/50 text-xs"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                        >
                            click to continue ▼
                        </motion.span>
                    )}
                </div>
            )}

        </div>
    );
};

export default DialogueBox;