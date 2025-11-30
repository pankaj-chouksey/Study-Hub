"use client"

const Paper = ({ rotation }: { rotation: number }) => (
  <svg
    width="60"
    height="80"
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Paper shadow */}
    <rect x="2" y="2" width="56" height="76" rx="2" fill="currentColor" opacity="0.1" />
    {/* Main paper */}
    <rect width="56" height="76" rx="2" fill="currentColor" opacity="0.8" />
    {/* Lines on paper */}
    <line x1="8" y1="15" x2="48" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="25" x2="48" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="35" x2="40" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="45" x2="48" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="55" x2="35" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
)

export function FlyingPapers() {
  const papers = [
    { delay: 0, duration: 20, left: "10%", rotation: -15 },
    { delay: 3, duration: 25, left: "25%", rotation: 10 },
    { delay: 6, duration: 22, left: "70%", rotation: -20 },
    { delay: 9, duration: 24, left: "85%", rotation: 15 },
    { delay: 12, duration: 23, left: "45%", rotation: -10 },
    { delay: 15, duration: 21, left: "60%", rotation: 20 },
    { delay: 18, duration: 26, left: "15%", rotation: -25 },
    { delay: 21, duration: 19, left: "75%", rotation: 5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {papers.map((paper, index) => {
        const { delay, duration, left, rotation } = paper
        return (
          <div
            key={index}
            className="absolute animate-float-up text-blue-500 dark:text-blue-400"
            style={{
              left,
              bottom: "-10%",
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <Paper rotation={rotation} />
          </div>
        )
      })}
    </div>
  )
}
