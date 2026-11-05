Hello!

As requested, this can be run with `npm i` and `npm start`.

This assessment took approximately an afternoon to complete, although the work was split between a night and a day.

I opted to build a simple backend with Node and Express to make the application a bit more persistent. There are definitely some optimizations that could be made there, but it is all functional and returns errors when necessary.

For the frontend, I imported the Mantine component library for styling and cherrypicked their template for the navbar from their documentation. Mantine is something I've used in previous roles, and I find it has just enough simplicity to not overcomplicate things or turn the tsx files into a jumbled mess. In a production application I would wrap all the components so it was easier to propogate any future changes in the FE.

All successful and failed interactions in the application have notifications associated with them. In a production environment, I would place the text for these notifications in a separate constants file and import the strings. This is easier for engineers when context switching or working on bugs, and also makes internationalization significantly easier if implemented down the line.

The application is responsive and I opted to not include a dropdown menu for the mobile view as the navbar is already quite sparse.

One thing that could be nice to add would be a modal/page to view individual images. Currently, some of the image can be cut off to maintain the sizing and styling of the cards on the page. Having a separate modal or page open on click could give a better user experience by showing the full image in its original aspect ratio. On top of this, if the backend service used ImageMagick or a similar service, it could generate smaller versions of the images to show in the grid view to decrease page size and increase performance. This would also be a good place to implement responsive images with the `srcset` property.

The uploads folder is empty and its contents are included in the gitignore file. There will be 0 images when initially building the app, but you can upload some to start!