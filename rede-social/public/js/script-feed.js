// // Dados de exemplo para os posts
// const posts = [
//   {
//     id: 1,
//     username: 'The_Rudo',
//     handle: '_rudo_Kub',
//     avatar: 'https://i.pinimg.com/736x/e9/28/2b/e9282b4ef2eb2aebe6e498661c42c0c8.jpg',
//     content: 'Post com 1 imagem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     images: ['https://i.pinimg.com/736x/fa/5e/eb/fa5eeb73ecefe13f3c6524f5c47dc0ce.jpg',
//       'https://i.pinimg.com/736x/e9/28/2b/e9282b4ef2eb2aebe6e498661c42c0c8.jpg']
//   },
//   {
//     id: 2,
//     username: 'The_Rudo_Kurbo',
//     handle: '_rudo_Kub',
//     avatar: 'https://i.pinimg.com/736x/e9/28/2b/e9282b4ef2eb2aebe6e498661c42c0c8.jpg',
//     content: 'Post com 2 imagens. Outra postagem com texto de exemplo.',
//     images: [
//       'https://i.pinimg.com/736x/fa/5e/eb/fa5eeb73ecefe13f3c6524f5c47dc0ce.jpg'
//     ]
//   }
// ];

// const feed = document.getElementById('feed-container');

// posts.forEach(post => {
//     const postDiv = document.createElement('div');
//     postDiv.classList.add('post');

//     // Cabeçalho do post
//     const postHeader = document.createElement('div');
//     postHeader.classList.add('post-header');

//     const avatarMold = document.createElement('div');
//     avatarMold.classList.add('avatar-mold');

//     // Avatar do usuário
//     const avatar = document.createElement('img');
//     avatar.src = post.avatar;
//     avatar.alt = `${post.username} avatar`;
//     avatar.classList.add('avatar');

//     // Info do usuário
//     const userInfo = document.createElement('div');
//     userInfo.classList.add('user-info');

//     const username = document.createElement('h2');
//     username.textContent = post.username;

//     const handle = document.createElement('p');
//     handle.textContent = `@${post.handle}`;

//     userInfo.appendChild(username);
//     userInfo.appendChild(handle);

//     postHeader.appendChild(avatarMold);
//     avatarMold.appendChild(avatar);
//     postHeader.appendChild(userInfo);
//     postDiv.appendChild(postHeader);

//     // Corpo do post
//     const postContent = document.createElement('div');
//     postContent.classList.add('post-content');

//     const postText = document.createElement('p');
//     postText.textContent = post.content;

//     postContent.appendChild(postText);
//     postDiv.appendChild(postContent);

//     // Se houver imagens, criar o grid apropriado
//     if (post.images.length > 0) {
//         const imagesGrid = document.createElement('div');

//         if (post.images.length === 1) {
//             imagesGrid.classList.add('grid-single');
//         } else if (post.images.length === 2) {
//             imagesGrid.classList.add('grid-two');
//         } else {
//             imagesGrid.classList.add('grid-three');

//             // Criar um container para imagens pequenas
//             const smallImagesContainer = document.createElement('div');
//             smallImagesContainer.classList.add('small-images-container');

//             post.images.forEach((imageURL, index) => {
//                 const img = document.createElement('img');
//                 img.src = imageURL;
//                 img.classList.add('post-img');

//                 if (index === 0) {
//                     img.classList.add('img-large');
//                     imagesGrid.appendChild(img);
//                 } else {
//                     img.classList.add('img-small');
//                     smallImagesContainer.appendChild(img);
//                 }
//             });

//             imagesGrid.appendChild(smallImagesContainer);
//         }

//         post.images.forEach((imageURL, index) => {
//             if (post.images.length < 3) {
//                 const img = document.createElement('img');
//                 img.src = imageURL;
//                 img.classList.add('post-img');
//                 imagesGrid.appendChild(img);
//             }
//         });

//         postDiv.appendChild(imagesGrid);
//     }

//     feed.appendChild(postDiv);
// });
