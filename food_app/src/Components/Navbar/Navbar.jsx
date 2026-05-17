import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as Forky } from "../../assets/forky.svg";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Hat } from "../../assets/hat.svg";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "../../Context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, allData, dimensions, isSite, user } =
    useContext(AppContext);
  const showSearch = Boolean(user) && location.pathname === "/";
  const [smallScreen, setSmallScreen] = useState(dimensions.width < 600);
  const [searchQuery, setSearchQuery] = useState("");
  const [clear, setClear] = useState(false);
  useEffect(() => {
    if (dimensions.width < 600) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [dimensions]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const queryToLowercase = searchQuery.toLowerCase();
    //filtering the allData array and creating
    // a new array (matchedArr) containing only those recipes for which
    //either the title or at least one ingredient matches
    const matchedArr = allData.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(queryToLowercase) ||
        (recipe.ingredients &&
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(queryToLowercase)
          ))
      );
    });
    if (searchQuery) {
      setClear(true);
    }
    setFilteredData(matchedArr);
  };

  return (
    <nav
      style={{
        width: "100%",
        color: "var(--pink)",
        display: "flex",
        justifyContent: isSite ? "space-between" : "center",
        alignItems: "center",
        backgroundColor: "var(--yellow)",
        gap: smallScreen ? "0.75em" : "12em",
        position: "fixed",
        padding: smallScreen ? "1em 1rem" : "1em 2rem",
        boxSizing: "border-box",
        zIndex: "100",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "0.512em",
          cursor: "pointer",
          flexShrink: 0,
        }}
        onClick={() => {
          if (!user) {
            navigate("/login");
          } else {
            setFilteredData(allData);
            navigate("/");
          }
        }}
      >
        <Forky width={30} height={30} />
        {smallScreen ? "" : <p>Forky</p>}
      </div>

      {showSearch && (
        <form
          style={{
            position: "relative",
            flex: 1,
            minWidth: 0,
            maxWidth: smallScreen ? "none" : "420px",
            backgroundColor: "var(--bg)",
            borderRadius: "2em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6em 1em",
            gap: "0.5em",
          }}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Search Recipes..."
            value={searchQuery}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.3em 0.7em",
              borderRadius: "1em",
              border: "0.1em solid #cfcfcf",
            }}
          />
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "none",
              borderRadius: "1em",
              padding: "0.3em",
              width: "2em",
              boxShadow: "var(--shadow)",
              marginLeft: "0.5em",
              cursor: "pointer",
            }}
          >
            <Search width={15} height={15} />
          </button>
          {clear ? (
            <button
              onClick={() => {
                setFilteredData(allData);
                setSearchQuery("");
                setClear(false);
              }}
              style={{
                color: "var(--pink)",
                background: "white",
                padding: "0.1em 0.5em",
                position: "absolute",
                borderRadius: "1em",
                right: smallScreen ? "17vw" : "20%",
                boxShadow: "var(--shadow)",
                border: "none",
                fontSize: "0.7em",
              }}
            >
              {smallScreen ? "X" : "clear"}
            </button>
          ) : (
            ""
          )}
        </form>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "0.512em",
          cursor: "pointer",
          flexShrink: 0,
        }}
        onClick={() => {
          if (user) {
            isSite ? navigate("/") : navigate("/profile");
          } else {
            navigate("/login");
          }
          setFilteredData(allData);
        }}
      >
        {isSite ? (
          <Hat width={30} height={30} />
        ) : (
          user && <Profile width={30} height={30} />
        )}
        {smallScreen ? "" : isSite ? <p>Explore</p> : user && <p>Profile</p>}
      </div>
    </nav>
  );
};

export default Navbar;
