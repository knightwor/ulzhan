import { motion } from "framer-motion"


const LoadingDots = () => {
  return (
    <>
      {[0, 0.2, 0.4].map((delay, index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            delay 
          }}
        >
          .
        </motion.span>
      ))}
    </>
  )
}

export default LoadingDots