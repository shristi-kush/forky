import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit3, FiGrid, FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { Circles } from "react-loader-spinner";
import Layout from "../../Layout/Layout";
import RecipesCard from "../../Components/Card/RecipesCard";
import Modal from "../../Components/Modal/Modal";
import AppContext from "../../Context/AppContext";
import { getAllRecipes } from "../../apis/Recipes";
import Pagination from "../../Components/Pagination/Pagination";
import { usePagination } from "../../hook/usePagination";
import "../Home/Home.css";
import "./Profile.css";

const AVATAR_URL =
  "https://images.pexels.com/photos/4057700/pexels-photo-4057700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Profile = () => {
  const { setAllData, allData, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userRecipes = useMemo(() => {
    if (!allData || !user?.id) return [];
    return allData.filter(
      (recipe) => String(recipe.user_id) === String(user.id)
    );
  }, [allData, user?.id]);

  const recipeCount = userRecipes.length;
  const isEmpty = !isLoading && recipeCount === 0;

  const {
    paginatedItems,
    page,
    totalPages,
    totalItems,
    rangeStart,
    rangeEnd,
    goToPage,
    goNext,
    goPrev,
    hasNext,
    hasPrev,
  } = usePagination(userRecipes);

  useEffect(() => {
    if (!user) {
      navigate("/site");
      return;
    }
    window.scrollTo({ top: 0 });
  }, [user, navigate]);

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      try {
        const recipes = await getAllRecipes();
        setAllData(recipes);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecipes();
  }, [setAllData]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openCreateModal = () => {
    setCardToEdit(undefined);
    window.scrollTo({ top: 0 });
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("sessionExpiration");
    setUser(null);
    navigate("/site");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {open && (
        <Modal
          setOpen={setOpen}
          cardToEdit={cardToEdit}
          setCardToEdit={setCardToEdit}
        />
      )}
      <Layout>
        <div className="home-page">
          <div className="profile-hero">
            <img className="profile-hero__avatar" src={AVATAR_URL} alt="" />
            <div className="profile-hero__info">
              <p className="profile-hero__eyebrow">My workspace</p>
              <h1 className="profile-hero__name">{user.name}</h1>
              <p className="profile-hero__meta">
                Create, edit, and manage your published recipes.
              </p>
            </div>
            <div className="profile-hero__actions">
              <button
                type="button"
                className="home-page__btn home-page__btn--primary"
                onClick={openCreateModal}
              >
                <FiPlus aria-hidden />
                New recipe
              </button>
              <button
                type="button"
                className="home-page__btn home-page__btn--ghost"
                onClick={handleLogout}
              >
                <FiLogOut aria-hidden />
                Log out
              </button>
            </div>
          </div>

          <div className="home-page__stats">
            <div className="home-page__stat">
              <span className="home-page__stat-label">Your recipes</span>
              <span className="home-page__stat-value">{recipeCount}</span>
            </div>
            <div className="home-page__stat">
              <span className="home-page__stat-label">Account</span>
              <span className="home-page__stat-value">Active</span>
            </div>
            <div className="home-page__stat">
              <span className="home-page__stat-label">Browse all</span>
              <button
                type="button"
                className="home-page__btn home-page__btn--secondary"
                style={{ marginTop: "0.35rem", padding: "0.45em 0.85em" }}
                onClick={() => navigate("/")}
              >
                <FiGrid aria-hidden />
                Community library
              </button>
            </div>
          </div>

          <section className="home-page__panel" aria-label="Your recipes">
            <div className="home-page__panel-head">
              <h2 className="home-page__panel-title">
                <FiEdit3 aria-hidden />
                Your recipes
              </h2>
              {!isLoading && !isEmpty && (
                <span className="home-page__badge">
                  {recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="home-page__loader" aria-busy="true">
                <Circles color="var(--pink)" width={36} height={36} />
                <span>Loading your recipes…</span>
                <div className="home-page__skeleton-grid" aria-hidden>
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="home-page__skeleton-card" />
                  ))}
                </div>
              </div>
            ) : isEmpty ? (
              <div className="home-page__center">
                <div className="home-page__center-icon">
                  <FiUser size={28} aria-hidden />
                </div>
                <h2>No recipes yet</h2>
                <p>
                  Your published recipes appear here. Everyone can browse them
                  on the community library.
                </p>
                <button
                  type="button"
                  className="home-page__btn home-page__btn--primary"
                  onClick={openCreateModal}
                >
                  <FiPlus aria-hidden />
                  Create your first recipe
                </button>
              </div>
            ) : (
              <>
                <ul className="recipe-grid">
                  {paginatedItems.map((recipe) => (
                    <li key={recipe._id}>
                      <RecipesCard
                        id={recipe._id}
                        title={recipe.title}
                        description={recipe.description}
                        image={recipe.image}
                        ingredients={recipe.ingredients}
                        steps={recipe.steps}
                        enableEdit
                        setOpen={setOpen}
                        setCardToEdit={setCardToEdit}
                      />
                    </li>
                  ))}
                </ul>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  onPageChange={goToPage}
                  onPrev={goPrev}
                  onNext={goNext}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                />
              </>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
