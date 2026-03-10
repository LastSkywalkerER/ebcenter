import React from 'react'

interface CourseSection {
  title: string
  content: (string | string[])[]
}

interface CourseProgramProps {
  sections: CourseSection[]
}

export const CourseProgram: React.FC<CourseProgramProps> = ({ sections }) => {
  return (
    <div className='space-y-8'>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className='border-b border-slate-100 pb-6 last:border-b-0'>
          <h2 className='text-lg font-semibold text-slate-900 mb-4'>{section.title}</h2>
          <div className='space-y-4'>
            {section.content.map((item, itemIndex) => (
              <div key={itemIndex}>
                {Array.isArray(item) ? (
                  <ul className='list-disc list-inside space-y-2 text-slate-600 text-sm'>
                    {item.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-slate-600 text-sm leading-relaxed'>{item}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
