import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CARD_IMG_URL, RESTAURANT_MENU_URL } from "../../constant";
import Shimmer from "./Shimmer.js";
const RestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState(0);
  const [restaurant, setRestaurant] = useState({});
  const resId = useParams();
  useEffect(() => {
    getRestaurantMenu();
  }, []);
  async function getRestaurantMenu() {
    const data = await fetch(RESTAURANT_MENU_URL + resId.id);
    const json = await data.json();
    console.log(
      Object.values(
        json?.data?.cards[2].groupedCard?.cardGroupMap?.REGULAR?.cards[1].card
          ?.card
      )
    );
    setRestaurant(json?.data?.cards[0].card?.card.info);
    setRestaurantMenu(
      json?.data?.cards[2].groupedCard?.cardGroupMap?.REGULAR?.cards[1].card
        ?.card?.itemCards
    );
  }
  return restaurantMenu ? (
    <div className="restaurant-menu">
      <div>
        <h1>Resturant Id :{resId.id}</h1>
        <h1>{restaurant.name}</h1>
        <img
          src={CARD_IMG_URL + restaurant.cloudinaryImageId}
          alt={restaurant.name}
        />
        <h3>Area : {restaurant.areaName}</h3>
        <h3>Cuisines : {restaurant.cuisines.join(", ")}</h3>
        <h4>Cost for Two : {restaurant.costForTwoMessage}</h4>
        <h4>Average Rating : {restaurant.avgRating} stars</h4>
      </div>
      <div className="menu">
        <h1>Menu</h1>
        <ul>
          {restaurantMenu.map((menu, i) => {
            return <li key={i}>{menu?.card?.info?.name}</li>;
          })}
        </ul>
      </div>
    </div>
  ) : (
    <Shimmer />
  );
};

export default RestaurantMenu;
