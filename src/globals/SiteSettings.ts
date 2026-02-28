import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroCta',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              localized: false,
            },
            {
              name: 'descriptionTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'descriptionText',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'headerLogo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'headerLogoText',
              type: 'text',
              localized: true,
            },
            {
              name: 'navHome',
              type: 'text',
              localized: true,
            },
            {
              name: 'navServices',
              type: 'text',
              localized: true,
            },
            {
              name: 'navTraining',
              type: 'text',
              localized: true,
            },
            {
              name: 'navContacts',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Contact Info',
          fields: [
            { name: 'contactPhone', type: 'text', localized: true },
            { name: 'contactEmail', type: 'text', localized: true },
            { name: 'contactAddress', type: 'text', localized: true },
            { name: 'contactWorkingHours', type: 'text', localized: true },
            { name: 'contactUnp', type: 'text', localized: true },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerTitle', type: 'text', localized: true },
            { name: 'footerDescription', type: 'textarea', localized: true },
            { name: 'footerCopyright', type: 'text', localized: true },
          ],
        },
        {
          label: 'Common',
          fields: [
            { name: 'commonMore', type: 'text', localized: true },
            { name: 'commonTariffs', type: 'text', localized: true },
            { name: 'commonRegister', type: 'text', localized: true },
            { name: 'commonSendRequest', type: 'text', localized: true },
            { name: 'commonCourseProgram', type: 'text', localized: true },
            { name: 'commonHome', type: 'text', localized: true },
            { name: 'commonServices', type: 'text', localized: true },
            { name: 'commonTraining', type: 'text', localized: true },
            { name: 'commonContacts', type: 'text', localized: true },
            { name: 'commonContactUs', type: 'text', localized: true },
            { name: 'commonPhone', type: 'text', localized: true },
            { name: 'commonEmail', type: 'text', localized: true },
            { name: 'commonAddress', type: 'text', localized: true },
            { name: 'commonWorkingHours', type: 'text', localized: true },
            { name: 'commonName', type: 'text', localized: true },
            { name: 'commonMessage', type: 'text', localized: true },
            { name: 'commonSelectCourse', type: 'text', localized: true },
            { name: 'commonDisclaimer', type: 'text', localized: true },
            { name: 'commonPhoneError', type: 'text', localized: true },
            { name: 'commonSuccess', type: 'text', localized: true },
            { name: 'commonError', type: 'text', localized: true },
            { name: 'commonSending', type: 'text', localized: true },
            { name: 'commonSecurityCheck', type: 'text', localized: true },
            { name: 'commonSecurityError', type: 'text', localized: true },
            { name: 'commonUnp', type: 'text', localized: true },
            {
              type: 'collapsible',
              label: 'Validation',
              fields: [
                { name: 'validationNameRequired', type: 'text', localized: true },
                { name: 'validationMessageRequired', type: 'text', localized: true },
                { name: 'validationEmailInvalid', type: 'text', localized: true },
              ],
            },
            {
              type: 'collapsible',
              label: 'Services',
              fields: [
                { name: 'servicesTitle', type: 'text', localized: true },
                { name: 'servicesSubtitle', type: 'text', localized: true },
                { name: 'backToServices', type: 'text', localized: true },
                { name: 'backToService', type: 'text', localized: true },
                { name: 'notFoundTitle', type: 'text', localized: true },
                { name: 'notFoundDescription', type: 'text', localized: true },
              ],
            },
            {
              type: 'collapsible',
              label: 'Training',
              fields: [
                { name: 'trainingSubtitle', type: 'text', localized: true },
                { name: 'courseDetails', type: 'text', localized: true },
                { name: 'registrationTitle', type: 'text', localized: true },
                { name: 'backToCourses', type: 'text', localized: true },
                { name: 'inDevelopment', type: 'text', localized: true },
                { name: 'courseProgramTitle', type: 'text', localized: true },
              ],
            },
            {
              type: 'collapsible',
              label: 'Contacts',
              fields: [
                { name: 'contactsSubtitle', type: 'text', localized: true },
                { name: 'contactInfoTitle', type: 'text', localized: true },
                { name: 'formTitle', type: 'text', localized: true },
                { name: 'phonePlaceholder', type: 'text', localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
