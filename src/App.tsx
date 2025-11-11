import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'

const turkishAnswers = [
  { text: 'Kesinlikle evet!', type: 'positive' },
  { text: 'Hiç şüphesiz', type: 'positive' },
  { text: 'Evet, kesinlikle', type: 'positive' },
  { text: 'Buna güvenebilirsin', type: 'positive' },
  { text: 'Gördüğüm kadarıyla, evet', type: 'positive' },
  { text: 'Büyük ihtimalle', type: 'positive' },
  { text: 'İyi görünüyor', type: 'positive' },
  { text: 'İşaretler evet diyor', type: 'positive' },
  { text: 'Evet', type: 'positive' },
  { text: 'Şimdi söyleyemem', type: 'uncertain' },
  { text: 'Daha sonra tekrar sor', type: 'uncertain' },
  { text: 'Şu anda söylemek daha iyi değil', type: 'uncertain' },
  { text: 'Tahmin edemem', type: 'uncertain' },
  { text: 'Daha çok konsantre ol ve tekrar sor', type: 'uncertain' },
  { text: 'Pek sayma', type: 'negative' },
  { text: 'Cevabım hayır', type: 'negative' },
  { text: 'Kaynaklarım hayır diyor', type: 'negative' },
  { text: 'Görünüş iyi değil', type: 'negative' },
  { text: 'Çok şüpheli', type: 'negative' },
  { text: 'Kesinlikle hayır', type: 'negative' }
]

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast.error('Önce bir soru sor!')
      return
    }

    if (isShaking) return

    setIsShaking(true)
    setShowAnswer(false)
    setAnswer('')

    setTimeout(() => {
      const randomAnswer = turkishAnswers[Math.floor(Math.random() * turkishAnswers.length)]
      setAnswer(randomAnswer.text)
      setShowAnswer(true)
      setIsShaking(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAskQuestion()
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/30" />
      
      <div className="absolute top-10 left-10 opacity-30">
        <Sparkle size={32} className="text-accent animate-pulse" weight="fill" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-30">
        <Sparkle size={24} className="text-accent animate-pulse" weight="fill" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-1/3 right-10 opacity-20">
        <Sparkle size={20} className="text-accent animate-pulse" weight="fill" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 magic-text tracking-tight">
            Sihirli Küre
          </h1>
          <p className="text-muted-foreground text-lg">
            Sorunu sor, kaderin cevabı versin
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Input
            id="magic-question"
            type="text"
            placeholder="Bir soru sor..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-center text-lg h-14 bg-card/50 backdrop-blur-sm border-2 border-border/50 focus:border-accent transition-colors placeholder:text-muted-foreground/50"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative"
        >
          <motion.div
            animate={
              isShaking
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.05, 0.95, 1.05, 0.95, 1]
                  }
                : {
                    y: [0, -8, 0],
                    rotate: [0, 1, -1, 0]
                  }
            }
            transition={
              isShaking
                ? {
                    duration: 0.8,
                    ease: 'easeInOut'
                  }
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
            }
            onClick={handleAskQuestion}
            className="cursor-pointer select-none"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <motion.div
                animate={
                  isShaking
                    ? {
                        boxShadow: [
                          '0 0 30px oklch(0.75 0.15 85 / 0.3)',
                          '0 0 60px oklch(0.75 0.15 85 / 0.6)',
                          '0 0 30px oklch(0.75 0.15 85 / 0.3)'
                        ]
                      }
                    : {}
                }
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-card via-primary to-card shadow-2xl shadow-primary/50"
              />
              
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/80 to-secondary/60 backdrop-blur-xl flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!showAnswer ? (
                    <motion.div
                      key="eight"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="text-8xl md:text-9xl font-bold text-accent magic-text"
                      style={{ 
                        textShadow: '0 0 20px oklch(0.75 0.15 85 / 0.5)',
                        filter: 'drop-shadow(0 0 10px oklch(0.75 0.15 85 / 0.3))'
                      }}
                    >
                      8
                    </motion.div>
                  ) : (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="text-center px-6 md:px-8"
                    >
                      <p className="text-xl md:text-2xl font-medium text-accent magic-text leading-tight tracking-wide"
                         style={{ 
                           textShadow: '0 0 15px oklch(0.75 0.15 85 / 0.4)'
                         }}>
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px oklch(0.75 0.15 85 / 0.2)',
                    '0 0 40px oklch(0.75 0.15 85 / 0.4)',
                    '0 0 20px oklch(0.75 0.15 85 / 0.2)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-muted-foreground text-sm"
          >
            Küreye tıkla veya Enter'a bas
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default App