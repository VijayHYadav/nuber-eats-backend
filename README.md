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