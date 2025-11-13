import React from 'react'


export default function JSONFormat() {
    return (
        <pre className="bg-cc-background border-2 border-cc-hover rounded-lg p-3 text-xs text-cc-primery/70 overflow-x-auto mb-4 monospace">
            {`{
  "title": "Space Exploration",
  "words": ["Rocket", "NASA", "Moon", "Astronaut"],
  "clues": [
    "Vehicle used to travel into space",
    "US space agency",
    "Earth's satellite",
    "Person who travels in space"
  ]
}`}
        </pre>
    )
}
