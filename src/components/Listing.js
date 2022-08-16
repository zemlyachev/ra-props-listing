import PropTypes from "prop-types";

function Listing({ items }) {
  const cropTitle = (title) => {
    title = title.replace(/&quot;/gi, "\u0022").replace(/&#39;/gi, "\u0027");
    return title.length > 50 ? title.slice(0, 50) + "..." : title;
  };

  const decoratePrice = (currCode, currPrice) => {
    switch (currCode) {
      case "USD":
        return "$" + currPrice;
      case "EUR":
        return "€" + currPrice;
      default:
        return currPrice + " " + currCode;
    }
  };

  const quantityClass = (quantity) => {
    let iq = "item-quantity ";
    return quantity <= 10
      ? (iq += "level-low")
      : quantity <= 20
      ? iq + "level-medium"
      : iq + "level-high";
  };

  const cards = items.map(
    (item) =>
      item.state === "active" && (
        <div key={item.listing_id} className="item">
          <div className="item-image">
            <a href={item.url}>
              <img src={item.MainImage.url_570xN} alt={item.title} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{cropTitle(item.title)}</p>
            <p className="item-price">
              {decoratePrice(item.currency_code, item.price)}
            </p>
            <p className={quantityClass(item.quantity)}>
              {item.quantity + " left"}
            </p>
          </div>
        </div>
      )
  );

  return <div className="item-list">{cards}</div>;
}

Listing.defaultProps = {
  items: [],
};

Listing.propTypes = {
  items: PropTypes.arrayOf(Object),
};

export default Listing;
