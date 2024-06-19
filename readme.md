<div id="top"></div>

<div align="center">
  <h3 align="center">Pijar Food Rest API</h3>
  
  <a href="">
    <image align="center" width="200" src='https://res.cloudinary.com/dpasid4jl/image/upload/v1717380554/pijar-food-assets/pijar-food-logo/Pijar_Food_Logo_pwadca.png' />
  </a>

  <p></p>
  
  <p align="center">
    <a href="https://github.com/muhabby/BE-Pijar-Food/issues">Report Bug</a>
    ·
    <a href="https://github.com/muhabby/BE-Pijar-Food/issues">Feature Request</a>
  </p>
</div>

## Table of Contents

<div>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#screenshoots">Screenshots</a></li>
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</div>

## About The Project

Pijar Food Rest API is server api that used in **Pijar Food Web & Mobile** . This server manage all function and endpoint in Pijar Food Application such as Create, Read , Update and Delete recipe. This server also facilitates account registration and login to create a profile account.

### Built With

- [Express.Js](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [Node.Js](https://nodejs.org/en/download/)

### Installation

- Clone Repository
```sh
git clone https://github.com/muhabby/BE-Pijar-Food.git
```

- Install Module
```sh
npm install
```

- Setup .env
```sh
DB_HOST= "db host"
DB_USER= "db username"
DB_NAME= "db name"
DB_PASSWORD= "db password"
DB_PORT= "db port"
JWT_TOKEN= "fill in random text"
PHOTO_NAME= "cloudinary username"
PHOTO_KEY= "cloudinary api key"
PHOTO_SECRET= "cloudinary api secret"
EMAIL_NAME= "name of the email to use for nodemailer"
EMAIL_PASS= "password of the email to use for nodemailer"
```

- Start Project
```sh
npm run dev
```

## Screenshoots

Here are some projects that use Pijar Food Rest API.

<h4 align="center">Pijar Food Website</h4>
<p align="center" display=flex>
    <table>
        <tr>
            <td align="center">Landing Page</td>
            <td align="center">Login Page</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984073/pijar-food-logo/Landing_Page_pn6k17.png" alt="Landing Page" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984070/pijar-food-logo/Login_ufze1n.png" alt="Login Page" width=100%/></td>
        </tr>
        <tr>
            <td align="center">Regist Page</td>
            <td align="center">Home</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984072/pijar-food-logo/Regist_h5lrog.png" alt="Regist Page" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984071/pijar-food-logo/home_ot3vmw.png" alt="Home" width=100%/></td>
        </tr>
        <tr>
            <td align="center">Add Recipe</td>
            <td align="center">My Recipe</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984069/pijar-food-logo/Add_Recipe_selzpi.png" alt="Add Recipe" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984073/pijar-food-logo/My_Recipe_fvzfsl.png" alt="My Recipe" width=100%/></td>
        </tr>
        <tr>
            <td align="center">Search Recipe</td>
            <td align="center">Detail Recipe</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984072/pijar-food-logo/Search_re6gfx.png" alt="Search Recipe" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984073/pijar-food-logo/Detail_Recipe_s13trr.png" alt="Detail Recipe" width=100%/></td>
        </tr>
        <tr>
            <td align="center">Edit and Delete Recipe</td>
            <td align="center">Edit Profile</td>
        </tr>
        <tr>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984204/pijar-food-logo/Edit_and_Delete_jexe7m.png" alt="Edit and Delete Recipe" width=100%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1717984071/pijar-food-logo/Update_Profile_jw8rkh.png" alt="Edit Profile" width=100%/></td>
        </tr>
    </table>  
</p>

<h4 align="center">Pijar Food Mobile</h4>
<p align="center" display=flex>
    <table>
        <tr align="center">
            <td>Login</td>
            <td>Regist</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246832/pijar-food-assets/ss-pijar-food-mobile/Login_a1jtof.jpg" alt="Login" width=50%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246835/pijar-food-assets/ss-pijar-food-mobile/Regist_bahd05.jpg" alt="Regist" width=50%/></td>
        </tr>
        <tr align="center">
            <td>Home</td>
            <td>Search Recipe</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246832/pijar-food-assets/ss-pijar-food-mobile/Home_uetjuc.jpg" alt="Home" width=50%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246832/pijar-food-assets/ss-pijar-food-mobile/Search_bh21yc.jpg" alt="Search Recipe" width=50%/></td>
        </tr>
        <tr align="center">
            <td>Add Recipe</td>
            <td>Profile</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246827/pijar-food-assets/ss-pijar-food-mobile/Add_Recipe_b1safs.jpg" alt="Add Recipe" width=50%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246833/pijar-food-assets/ss-pijar-food-mobile/Profile_jnqm3y.jpg" alt="Profile" width=50%/></td>
        </tr>
        <tr align="center">
            <td>Detail Recipe</td>
            <td>List Recipes</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246831/pijar-food-assets/ss-pijar-food-mobile/Detail_Recipe_gxt7by.jpg" alt="Detail Recipe" width=50%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246831/pijar-food-assets/ss-pijar-food-mobile/List_Recipes_bvjtqr.jpg" alt="List Recipe" width=50%/></td>
        </tr>
        <tr align="center">
            <td>Filter Recipes by Category</td>
            <td>Edit Profile</td>
        </tr>
        <tr align="center"> 
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246828/pijar-food-assets/ss-pijar-food-mobile/Filter_Recipes_k5ibzu.jpg" alt="Filter Recipe by Category" width=50%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246831/pijar-food-assets/ss-pijar-food-mobile/Edit_Profile_nim0bq.jpg" alt="Edit Profile" width=50%/></td>
        </tr>
        <tr align="center">
            <td>My Recipes</td>
            <td>Edit & Delete Recipe</td>
        </tr>
        <tr align="center">
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718247466/pijar-food-assets/ss-pijar-food-mobile/My_Recipes_o182w0.jpg" alt="My Recipe" width=50%></td>
            <td><image src="https://res.cloudinary.com/dpasid4jl/image/upload/v1718246831/pijar-food-assets/ss-pijar-food-mobile/Edit_Delete_Recipe_ai70z8.jpg" alt="Edit & Delete Recipe" width=50%/></td>
        </tr>
    </table>  
</p>

## Contribution

Contributions that make the open source community the best place to learn and create. Every contribution you make is valuable.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your/branch`)
3. Commit your Changes (`git commit -m 'Add some new feature'`)
4. Push to the Branch (`git push origin feature/yourbranch`)
5. Open a Pull Request

## Related Project

- [Pijar Food Website Demo](https://pijar-food.vercel.app)
- [Pijar Food Mobile Download](https://drive.google.com/file/d/1K99DPe7h_4NGWsueDqpKEDLqm2gAZC0B/view?usp=sharing)
- [Pijar Food Web Frontend Repository](https://github.com/muhabby/Pijar-Food)
- [Pijar Food Mobile Repository](https://github.com/muhabby/Pijar-Food-Mobile)

## Contact

Feel free to connect with me for future collaborations [Muhabby Mulya](https://github.com/muhabby)

<p align="right">(<a href="#top">back to top</a>)</p>