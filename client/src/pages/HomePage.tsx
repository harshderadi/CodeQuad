import { motion } from "framer-motion";
import illustration from "@/assets/Low code development-amico.svg";
import FormComponent from "@/components/forms/FormComponent";

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-800 text-white px-4 sm:px-8">
            <motion.div 
                className="my-12 flex h-full min-w-full flex-col items-center justify-evenly gap-12 sm:flex-row sm:pt-0"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Illustration Section */}
                <motion.div 
                    className="flex w-full justify-center sm:w-1/2 sm:pl-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img 
                        src={illustration} 
                        alt="CodeQuad Illustration" 
                        className="mx-auto w-[15px] sm:w-[400px] drop-shadow-2xl transition-transform hover:scale-105" 
                    />
                </motion.div>

                {/* Form Section */}
                <div className="flex w-full items-center justify-center sm:w-1/2">
                    <motion.div 
                        className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 w-full max-w-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <h2 className="text-xl font-semibold text-center mb-4">Welcome to CodeQuad</h2>
                        <FormComponent />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default HomePage;
