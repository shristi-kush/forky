import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiGrid, FiUser } from "react-icons/fi";
import { Circles } from "react-loader-spinner";
import Layout from "../../Layout/Layout";
import RecipesCard from "../../Components/Card/RecipesCard";
import { getAllRecipes } from "../../apis/Recipes";
import AppContext from "../../Context/AppContext";
import Pagination from "../../Components/Pagination/Pagination";
import { usePagination } from "../../hook/usePagination";
import "./Home.css";

const Home = () => {
  const { setAllData, user, setFilteredData, filteredData, allData } =
    useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const totalCount = allData?.length ?? 0;
  const visibleCount = filteredData?.length ?? 0;
  const isFiltered = totalCount > 0 && visibleCount !== totalCount;
  const isEmpty = !isLoading && visibleCount === 0;

  const list = useMemo(() => filteredData || [], [filteredData]);
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
  } = usePagination(list);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const recipes = await getAllRecipes();
        setAllData(recipes);
        setFilteredData(recipes);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [setAllData, setFilteredData]);

  useEffect(() => {
    if (!user) {
      navigate("/site");
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="home-page">
        <header className="home-page__header">
          <p className="home-page__eyebrow">Community library</p>
          <div className="home-page__title-row">
            <h1 className="home-page__title">Browse all recipes</h1>
            <div className="home-page__actions">
              <button
                type="button"
                className="home-page__btn home-page__btn--secondary"
                onClick={() => navigate("/profile")}
              >
                <FiUser aria-hidden />
                My workspace
              </button>
            </div>
          </div>
          <p className="home-page__subtitle">
            The same recipe library for every member. Discover what others have
            shared, then open a card to view the full recipe.
          </p>
        </header>

        <section className="home-page__panel" aria-label="All recipes">
          <div className="home-page__panel-head">
            <h2 className="home-page__panel-title">
              <FiGrid aria-hidden />
              All recipes
            </h2>
            {!isLoading && !isEmpty && (
              <span className="home-page__badge">
                {isFiltered
                  ? `${visibleCount} of ${totalCount} results`
                  : `${visibleCount} recipes`}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="home-page__loader" aria-busy="true">
              <Circles color="var(--pink)" width={36} height={36} />
              <span>Loading recipes…</span>
              <div className="home-page__skeleton-grid" aria-hidden>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="home-page__skeleton-card" />
                ))}
              </div>
            </div>
          ) : isEmpty ? (
            <div className="home-page__center">
              <div className="home-page__center-icon">
                <FiBookOpen size={28} aria-hidden />
              </div>
              <h2>
                {totalCount === 0
                  ? "No recipes published yet"
                  : "No recipes match your search"}
              </h2>
              <p>
                {totalCount === 0
                  ? "Be the first to add one from your workspace."
                  : "Try another keyword or clear search in the navigation bar."}
              </p>
              {totalCount === 0 && (
                <button
                  type="button"
                  className="home-page__btn home-page__btn--primary"
                  onClick={() => navigate("/profile")}
                >
                  <FiUser aria-hidden />
                  Go to my workspace
                </button>
              )}
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
                      enableEdit={false}
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
  );
};

export default Home;
