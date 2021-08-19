# Number Eats

# Note: This README.md is not well documented.

The Backend of Number Eats Clone

## User Entity:

- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery)

## User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

## Restaurant Entity

- name
- category
- address
- coverImage

- Edit Restaurants
- Delete Restaurants

## Category Entity

- name
- coverImg
- slug
  OneToMany
- restaurants

- See Categories
- See Restaurants by Category (pagination)
- See Restaurants (pagination)
- See Restaurants

- Create Dish
- Edit Dish
- Delete Dish

- Orders CRUD
- Orders Subscription(Owner, Customer, Deslivery)

- Payments (CRON)

<!--

mutation {
  createAccount(
    input: { email: "admin@admin.com", password: "1234", role: Owner }
  ) {
    ok
    error
  }
}

mutation {
  login(input: { email: "admin@admin.com", password: "1234" }) {
    ok
    error
    token
  }
}

{
  me {
    id
    email
    role
  }
}

{
  userProfile(userId:58){
    ok
    error
    user {
      email
    }
  }
}

mutation {
  createRestaurant(
    input: {
      name: "BBQ House"
      address: "123 Altavista"
      coverImg: "https:///"
      categoryName: "Korean BBq"
    }
  ) {
    ok
    error
  }
}

mutation {
  editRestaurant(input: {
    restaurantId: 1,
    name: "The BBQ House",
  }) {
    ok
    error
  }
}

mutation {
  deleteRestaurant(input: {
    restaurantId: 1,
  }) {
    ok
    error
  }
}

{
  allCategories {
    ok
    error
    categories {
      slug
      name,
      restaurantCount
    }
  }
}

{
  category(input:{ 
    slug: "korean-bbq",
  }) {
    ok
    error
    totalPages
    category {
      id
      name
      slug
      restaurantCount
      restaurants {
        id
        name
      }
    }
  }
}

{
  restaurants(input:{}){
    error
    ok
    totalPages
    totalResults
    results {
      name
      id
    }
  }
}

{
  restaurant(input:{restaurantId: 2}){
    ok
    error
    restaurant {
      id
      name
    }
  }
}

-->