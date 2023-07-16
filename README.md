# [![logo](https://github.com/compsoc-edinburgh/project-share-web/assets/38633386/f33978b6-c0fe-4a13-9bdf-e91e9752b46b)](https://projectshare.comp-soc.com/)

Hello world! Welcome to Project Share's GitHub repository.

## What is Project Share?

Project Share is a vibrant society at the University of Edinburgh where students meet to share their ongoing tech projects. The website serves as the society's digital heart, showcasing our projects, mission, and team members.

## How to add your project

Awesome! Here's how you can do it:

0. If you're unfamiliar with creating Pull Requests (PRs), we recommend you watch or read some of these [guides](https://opensource.com/article/19/7/create-pull-request-github) to do so. There are many!

1. Add any images and video files you would want to display inside the `public/media/projects` folder. Make sure to have descriptive names and not upload files larger than 1mb or 2mb (please!).

2. Open up `constants.ts`. Here is where all of the data to display the projects is stored.

3. In this file, you want to add your own details about your project. Fields that contain a `?` can be skipped. Look at other fields and copy the layout!

```
export interface Project {
  id: number
  title: string
  creators: [{
    name: string
    avatarURL?: string
    contactURL?: string
  }...]
  description: string
  projectURL?: string
  media: string
  icon?: string
}
```
4. To preview your changes, run these commands on your terminal. Make sure that the terminal is in the project's root directory. A link will show up which you can use to preview the website!
```
$ npm install
```
```
$ npm run dev
```

5. Once you've made your tweaks, commit your changes, submit your PR and we'll review it as soon as we can!

If you need more help, don't hesitate to ask on our [Discord Server](https://discord.gg/wNGukFdBgp).

## Technology Stack

Our website is built with the power of React, styled-components, and react-router. Additionally, we auto-deploy with GitHub Pages! To read about the actual front-end engineering, check the [BTS](https://projectshare.comp-soc.com/components)!

## Contact Us

Got questions? Join the conversation on our [Discord Server](https://discord.gg/wNGukFdBgp). We are always happy to help!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Remember, coding is a journey, not a destination. Let's continue to grow and learn together. Welcome to the Project Share community!
