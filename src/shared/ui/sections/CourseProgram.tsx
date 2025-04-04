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
    <div className='bg-white rounded-lg shadow-lg p-8'>
      <div className='space-y-8'>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className='border-b border-gray-200 pb-6 last:border-b-0'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>{section.title}</h2>
            <div className='space-y-4'>
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {Array.isArray(item) ? (
                    <ul className='list-disc list-inside space-y-2 text-gray-700'>
                      {item.map((subItem, subIndex) => (
                        <li key={subIndex}>{subItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-700'>{item}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
