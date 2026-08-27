import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AffiliateDisclosurePage from "./pages/AffiliateDisclosurePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import GuidesIndexPage from "./pages/GuidesIndexPage";
import Guide1ShoesStability from "./pages/guides/Guide1ShoesStability";
import Guide2RacketShapes from "./pages/guides/Guide2RacketShapes";
import Guide3ChooseRacket from "./pages/guides/Guide3ChooseRacket";
import CoachingPage from "./pages/CoachingPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import PlayPage from "./pages/PlayPage";
import NutritionPage from "./pages/NutritionPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/coaching"} component={CoachingPage} />
      <Route path={"/competitions"} component={CompetitionsPage} />
      <Route path={"/play"} component={PlayPage} />
      <Route path={"/nutrition"} component={NutritionPage} />
      <Route path={"/guides"} component={GuidesIndexPage} />
      <Route path={"/guides/best-padel-shoes-stability"} component={Guide1ShoesStability} />
      <Route path={"/guides/padel-racket-shapes-explained"} component={Guide2RacketShapes} />
      <Route path={"/guides/how-to-choose-a-padel-racket"} component={Guide3ChooseRacket} />
      <Route path={"/affiliate-disclosure"} component={AffiliateDisclosurePage} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/contact"} component={ContactPage} />
      <Route path={"/privacy-policy"} component={PrivacyPolicyPage} />
      <Route path={"/terms-of-use"} component={TermsOfUsePage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
