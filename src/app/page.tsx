'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download,
  Menu,
  X,
  Sun,
  Moon,
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Cloud,
  Zap,
  Award,
  Trophy,
  BookOpen,
  Briefcase,
  Clock
} from 'lucide-react'

interface TerminalProps {
  isActive: boolean
  onComplete: () => void
}

function Terminal({ isActive, onComplete }: TerminalProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const commands = [
    { text: 'Initializing portfolio system...', delay: 1000 },
    { text: 'Loading skills database...', delay: 1500 },
    { text: 'Deploying projects...', delay: 1200 },
    { text: 'Establishing secure connection...', delay: 1000 },
    { text: 'Welcome to Mohammed Safwan\'s Portfolio', delay: 800 },
    { text: 'Type "help" for available commands', delay: 600 }
  ]

  useEffect(() => {
    if (!isActive) return

    const typeCommand = async () => {
      if (currentLine < commands.length) {
        setIsTyping(true)
        const command = commands[currentLine]
        let text = ''
        
        // Smooth typing animation with faster speed
        for (let i = 0; i <= command.text.length; i++) {
          text = command.text.substring(0, i)
          setCurrentText(text)
          await new Promise(resolve => setTimeout(resolve, 30)) // Faster typing speed
        }
        
        setCurrentLine(currentLine + 1)
        setCurrentText('')
        setIsTyping(false)
        
        if (currentLine === commands.length - 1) {
          setTimeout(onComplete, 2000)
        } else {
          setTimeout(typeCommand, command.delay)
        }
      }
    }

    typeCommand()
  }, [isActive, currentLine, onComplete])

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      const newHistory = [...commandHistory, `$ ${userInput}`]
      setCommandHistory(newHistory)
      
      if (userInput.toLowerCase() === 'help') {
        setTimeout(() => {
          setCommandHistory([...newHistory, 'Available commands:', '  about - Learn about me', '  projects - View my projects', '  skills - See my skills', '  contact - Get in touch', '  clear - Clear terminal'])
        }, 300)
      } else if (userInput.toLowerCase() === 'about') {
        setTimeout(() => {
          setCommandHistory([...newHistory, 'Mohammed Safwan - Full Stack Developer', 'Passionate about creating amazing web experiences'])
        }, 300)
      } else if (userInput.toLowerCase() === 'clear') {
        setCommandHistory([])
      } else if (userInput.toLowerCase() === 'projects') {
        setTimeout(() => {
          setCommandHistory([...newHistory, 'Check out my projects section below!'])
        }, 300)
      } else if (userInput.toLowerCase() === 'skills') {
        setTimeout(() => {
          setCommandHistory([...newHistory, 'Skills: React, Node.js, Python, TypeScript, and more!'])
        }, 300)
      } else if (userInput.toLowerCase() === 'contact') {
        setTimeout(() => {
          setCommandHistory([...newHistory, 'Email: safwancoding1919@gmail.com'])
        }, 300)
      } else {
        setTimeout(() => {
          setCommandHistory([...newHistory, `Command not found: ${userInput}`, 'Type "help" for available commands'])
        }, 300)
      }
      
      setUserInput('')
    }
  }

  if (!isActive) return null

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-background rounded-lg shadow-2xl border border-foreground/20">
          <div className="bg-muted/50 px-4 py-2 rounded-t-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground text-sm ml-2">portfolio-terminal</span>
          </div>
          <div className="p-4 font-mono text-sm text-foreground h-96 overflow-y-auto">
            {commands.slice(0, currentLine).map((cmd, index) => (
              <div key={index} className="mb-1">
                <span className="text-primary">$</span> {cmd.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-1">
                <span className="text-primary">$</span> {currentText}
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
              </div>
            )}
            
            {currentLine >= commands.length && (
              <>
                {commandHistory.map((line, index) => (
                  <div key={index} className="mb-1">{line}</div>
                ))}
                <div className="flex items-center">
                  <span className="text-primary">$</span>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent outline-none ml-2 flex-1 text-foreground"
                    placeholder="Type a command..."
                    autoFocus
                  />
                  <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ScrollAnimationProps {
  children: React.ReactNode
  animation: 'fadeIn' | 'slideUp' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'rotateIn'
  delay?: number
  className?: string
}

function ScrollAnimation({ children, animation, delay = 0, className = '' }: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return 'opacity-0'
        case 'slideUp':
          return 'opacity-0 translate-y-10'
        case 'scaleIn':
          return 'opacity-0 scale-95'
        case 'slideLeft':
          return 'opacity-0 translate-x-10'
        case 'slideRight':
          return 'opacity-0 -translate-x-10'
        case 'rotateIn':
          return 'opacity-0 rotate-3 scale-95'
        default:
          return 'opacity-0'
      }
    }

    return 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0'
  }

  const getTransitionClass = () => {
    return 'transition-all duration-700 ease-out'
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${getTransitionClass()} ${className}`}
    >
      {children}
    </div>
  )
}

interface DigitalClockProps {
  className?: string
}

function DigitalClock({ className = '' }: DigitalClockProps) {
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Don't render until mounted on client
  if (!mounted || !time) {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 blur-sm opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            <div className="font-mono font-bold tracking-wider">
              00:00:00
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 blur-sm opacity-60 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          <div className="font-mono font-bold tracking-wider">
            {formatTime(time)}
          </div>
        </div>
      </div>
    </div>
  )
}

interface WeatherProps {
  className?: string
}

function Weather({ className = '' }: WeatherProps) {
  const [weather, setWeather] = useState({
    temp: 28,
    icon: '☀️'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Simulate weather data - in real app, you'd fetch from a weather API
    const weatherConditions = [
      { temp: 28, icon: '☀️' },
      { temp: 26, icon: '⛅' },
      { temp: 24, icon: '☁️' },
      { temp: 22, icon: '🌦️' },
      { temp: 30, icon: '🌞' }
    ]
    
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
    setWeather(randomWeather)
  }, [])

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 blur-sm opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            <div className="flex items-center justify-center gap-1 font-mono font-bold tracking-wider">
              <span>☀️</span>
              <span>28°C</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 blur-sm opacity-60 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          <div className="flex items-center justify-center gap-1 font-mono font-bold tracking-wider">
            <span>{weather.icon}</span>
            <span>{weather.temp}°C</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showTerminal, setShowTerminal] = useState(true)

  const handleTerminalComplete = () => {
    setShowTerminal(false)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press Ctrl + ` (backtick) to open terminal anytime
      if (e.ctrlKey && e.key === '`') {
        setShowTerminal(true)
      }
      // Press Escape to close terminal
      if (e.key === 'Escape' && showTerminal) {
        setShowTerminal(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showTerminal])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { 
      category: 'Programming Languages', 
      items: ['C', 'C++', 'Python'], 
      icon: Code 
    },
    { 
      category: 'Web Development', 
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'NodeJS'], 
      icon: Globe 
    },
    { 
      category: 'Cloud & Databases', 
      items: ['Google Cloud', 'MySQL', 'MongoDB'], 
      icon: Cloud 
    },
    { 
      category: 'Tools & Software', 
      items: ['VS Code', 'MySQL Workbench', 'Figma', 'Canva', 'Git & GitHub'], 
      icon: Zap 
    },
  ]

  const projects = [
    {
      title: 'DeLearner – AI Code Reviewing Agent',
      description: 'Built an AI-powered assistant that reviews code line by line, highlights issues with explanations, and suggests fixes. Integrated auto time/space complexity analysis and one-click corrections, helping developers boost efficiency.',
      tech: ['AI/ML', 'Code Analysis', 'React', 'Node.js'],
      github: 'https://github.com/Safwan-1919',
      demo: '#',
      year: '2025',
      featured: true
    },
    {
      title: 'AI Interview Coach',
      description: 'An intelligent interview preparation platform that conducts realistic mock interviews with AI. Features real-time feedback, question analysis, and personalized coaching to help job seekers improve their interview skills and confidence.',
      tech: ['React', 'Node.js', 'OpenAI API', 'Express', 'MongoDB'],
      github: 'https://github.com/Safwan-1919/AI-Interview-Coach',
      demo: 'https://ai-interview-coach-for-everyone.vercel.app/',
      year: '2025',
      featured: true,
      image: '/images/ai-interviewer.png'
    },
    {
      title: 'Real-Time Chat Application',
      description: 'Developed a messaging platform with React, Node.js, Express, and Socket.IO supporting private and group chats. Implemented authentication and persistent chat history with MongoDB, tested for smooth multi-user performance.',
      tech: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB'],
      github: 'https://github.com/Safwan-1919',
      demo: '#',
      year: '2024'
    },
    {
      title: 'Airline Database Management System',
      description: 'Developed a full-stack application using HTML, CSS, JavaScript, Node.js, and MongoDB, providing an end-to-end solution for airline reservation management. Enabled returning users to rebook seamlessly with booking history and cancellation support.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Safwan-1919',
      demo: '#',
      year: '2024'
    }
  ]

  const achievements = [
    {
      title: 'HackSummit 2025 – Runner-up',
      organization: 'GLUG – P.A. College of Engineering',
      description: 'Developed a web-based safety system with voice-activated SOS, live location tracking, and AI-driven threat detection. Designed a responsive interface using React and Next.js with safety-first features.',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      title: 'Participant – Code Meet Hackathon 2024',
      organization: '24-Hour Hackathon',
      description: 'Collaborated in a team to prototype a web solution within 24 hours, enhancing problem-solving and teamwork skills.',
      icon: Award,
      color: 'text-blue-500'
    }
  ]

  const certifications = [
    'Introduction to Computer Science (CS50) – Harvard University, 2023',
    'Web Development – Udemy, 2024',
    'Data Structures and Algorithms (DSA) – GeeksforGeeks, 2025'
  ]

  return (
    <>
      <Terminal isActive={showTerminal} onComplete={handleTerminalComplete} />
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${showTerminal ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-500`}>
        <div className="bg-background text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {['home', 'about', 'skills', 'projects', 'achievements', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTerminal(true)}
                  className="hidden md:flex"
                  title="Open Terminal (Ctrl + `)"
                >
                  <Terminal className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="hidden md:flex"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b shadow-lg">
                <div className="px-3 py-2 border-b">
                  <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Menu
                  </span>
                </div>
                {['home', 'about', 'skills', 'projects', 'achievements', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-colors ${
                      activeSection === section
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                      {activeSection === section && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
                <div className="pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-full justify-start h-10"
                  >
                    {isDarkMode ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative md:pt-24">
          {/* Small Digital Clock in top right corner - Responsive */}
          <div className="absolute top-24 right-4 md:top-24 md:right-8 z-20">
            <DigitalClock className="text-sm md:text-lg lg:text-xl xl:text-2xl mb-1 md:mb-2" />
            <Weather className="text-xs md:text-sm lg:text-base" />
          </div>
          
          <div className="max-w-7xl mx-auto text-center w-full">
            <ScrollAnimation animation="fadeIn" delay={200}>
              <div className="mb-8">
                <ScrollAnimation animation="scaleIn" delay={400}>
                  {/* Profile Picture - Mobile Optimized */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-3 md:border-4 border-primary/20 shadow-xl shadow-primary/10">
                        <img
                          src="https://z-cdn-media.chatglm.cn/files/3283d3a1-1bbe-4a0b-981a-471ef0b8a0eb_151817132.jpg?auth_key=1792874612-9c0f9131b79f49afa4bd8326d5929a87-0-aeb545ffd4c9eb65c36cd7262f077db3"
                          alt="Mohammed Safwan"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="slideUp" delay={600}>
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Mohammed Safwan
                  </h1>
                </ScrollAnimation>
                
                <ScrollAnimation animation="slideUp" delay={800}>
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 md:mb-6 px-4">
                    Computer Science & Engineering
                  </p>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fadeIn" delay={1000}>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto mb-6 md:mb-8 px-6 leading-relaxed">
                    Proactive developer passionate about creating innovative solutions with modern technologies.
                  </p>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slideUp" delay={1200}>
              {/* Desktop Buttons - Original Layout */}
              <div className="hidden md:flex justify-center gap-4 mb-8">
                <Button size="lg" onClick={() => scrollToSection('projects')} className="shadow-lg">
                  View My Work
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
                  Contact
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </a>
                </Button>
              </div>
              
              {/* Mobile Buttons - Current Layout */}
              <div className="md:hidden flex flex-col gap-3 mb-6 px-4">
                <Button size="lg" onClick={() => scrollToSection('projects')} className="w-full shadow-lg">
                  View My Work
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')} className="flex-1">
                    Contact
                  </Button>
                  <Button variant="secondary" size="lg" asChild className="flex-1">
                    <a href="/resume.pdf" download>
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="scaleIn" delay={1400}>
              {/* Mobile Social Links */}
              <div className="flex justify-center items-center gap-6 mb-8 md:mb-0">
                <Button variant="ghost" size="icon" asChild className="h-10 w-10 md:h-9 md:w-9 rounded-full hover:bg-primary/10">
                  <a href="https://github.com/Safwan-1919" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="h-10 w-10 md:h-9 md:w-9 rounded-full hover:bg-primary/10">
                  <a href="https://linkedin.com/in/mohammed-safwan1919/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="h-10 w-10 md:h-9 md:w-9 rounded-full hover:bg-primary/10">
                  <a href="mailto:safwancoding1919@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ScrollAnimation>

            {/* Mobile Quick Stats */}
            <ScrollAnimation animation="fadeIn" delay={1600} className="md:hidden">
              <div className="grid grid-cols-3 gap-4 mt-8 px-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">3+</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">8.5</div>
                  <div className="text-xs text-muted-foreground">CGPA</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">6+</div>
                  <div className="text-xs text-muted-foreground">Months</div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation animation="slideUp" delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                About Me
              </h2>
            </ScrollAnimation>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  I am currently pursuing my Bachelor's degree in Computer Science and Engineering at 
                  PA College of Engineering, Mangalore, with a CGPA of 8.5/10. My journey in technology 
                  has been driven by curiosity and a passion for solving complex problems.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Currently working as a Salesforce Intern at Novigo Solutions, I'm gaining hands-on 
                  experience in enterprise-level development using Apex, SOQL, and Lightning Web Components.
                  I've built a client onboarding portal that streamlines data collection and improves process efficiency.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  I'm passionate about full-stack development, AI/ML applications, and creating innovative 
                  solutions that make a real impact. My goal is to continuously learn and grow while 
                  contributing to meaningful projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Problem Solver</Badge>
                  <Badge variant="secondary">Quick Learner</Badge>
                  <Badge variant="secondary">Team Player</Badge>
                  <Badge variant="secondary">Goal Oriented</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-primary">3+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Projects Completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-primary">2025</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Expected Graduation</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-primary">8.5</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-primary">2+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup, index) => {
                const Icon = skillGroup.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
  {project.image ? (
    <img 
      src={project.image} 
      alt={project.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-6xl text-muted-foreground/20">
        {project.title.charAt(0)}
      </div>
    </div>
  )}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary">{project.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 px-4 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Achievements & Certifications
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 ${achievement.color}`} />
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-center mb-8">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <p className="text-sm">{cert}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Let's Connect</CardTitle>
                  <CardDescription>
                    I'm always interested in hearing about new opportunities and collaborations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">safwancoding1919@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-muted-foreground">@Safwan-1919</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">mohammed-safwan1919</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">+91-7892104273</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Feel free to reach out if you're looking for a developer, have a question, 
                      or just want to connect!
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button asChild>
                        <a href="mailto:safwancoding1919@gmail.com">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="https://linkedin.com/in/mohammed-safwan1919/" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background border-t py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 Mohammed Safwan. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Safwan-1919" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com/in/mohammed-safwan1919/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:safwancoding1919@gmail.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </>
  )
}