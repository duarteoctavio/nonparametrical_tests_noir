// Component for World ID Login using IDKitWidget
// This component renders the World ID button, handles the verification callback,
// and sends the proof to the backend verification endpoint.
// Updated: Uses correct types ISuccessResult and VerificationLevel enum.
import type { ISuccessResult, IErrorState } from "@worldcoin/idkit"; // Re-add IErrorState import
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit"; // Import VerificationLevel enum
import { useState } from "react"; // Import useState for loading/error handling
import { useNavigate } from "@remix-run/react"; // Import useNavigate
import { cn } from "~/utils/cn"; // Import cn utility for merging classes

// Add className prop for button styling
interface WorldcoinLoginProps {
  className?: string;
}

export default function WorldcoinLogin({ className }: WorldcoinLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Get navigate function

  const handleVerify = async (proof: ISuccessResult) => {
    console.log("World ID Proof received from IDKit:", proof);
    setError(null);
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/worldcoin-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proof),
        // We don't need manual redirect handling here anymore
        // redirect: 'manual', // Setting this explicitly might prevent browser auto-redirect if it was happening inconsistently
      });

      // If backend verification failed (4xx/5xx)
      if (!response.ok) {
        let errorResult = { error: "Verification failed on the server.", code: "BACKEND_ERROR" };
        try {
          errorResult = await response.json();
        } catch (e) {
          console.error("Could not parse error response from backend:", e);
        }
        console.error("Backend verification failed:", errorResult);
        // Throw error to trigger IDKit's onError
        throw new Error(errorResult.error || "Verification failed on the server.");
      }

      // If backend verification succeeded (2xx or 3xx redirect)
      // We don't need to do anything here. If it was a redirect, the backend handled the cookie.
      // If it was 2xx (unexpected), we still proceed to onSuccess.
      console.log(
        "Backend verification successful (status code: " +
          response.status +
          "). Awaiting onSuccess callback.",
      );
    } catch (err: unknown) {
      console.error("Error during handleVerify:", err);
      let errorMessage = "An error occurred during verification.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setIsLoading(false);
      throw err; // Re-throw error to ensure IDKit's onError is called
    }
    // Loading state is reset in onSuccess/onError
  };

  const onSuccess = () => {
    console.log("World ID Verification Success callback triggered. Navigating to dashboard...");
    setError(null);
    setIsLoading(false);
    navigate("/dashboard"); // Manually navigate on success
  };

  const onError = (error: IErrorState | null | undefined) => {
    console.error("IDKit Error callback triggered:", error);
    const code = error?.code ?? "UNKNOWN_ERROR";
    setError(`IDKit error occurred (Code: ${code})`);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <IDKitWidget
        app_id="app_d8c5804c8e9c81c610125012f6c866b7" // TODO: Replace with your actual App ID (use env vars ideally)
        action="login" // TODO: Replace with your action ID (use env vars ideally)
        verification_level={VerificationLevel.Device} // Use enum value
        handleVerify={handleVerify}
        onSuccess={onSuccess}
        onError={onError}
        // Other optional configurations like theme, signal, etc.
      >
        {({ open }) => (
          <button
            onClick={open}
            disabled={isLoading}
            // Apply base styles and merge with passed className
            className={cn(
              "inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className, // Allow overriding/extending styles
            )}
          >
            {isLoading ? "Verifying..." : "Verify with World ID"} {/* Updated button text */}
          </button>
        )}
      </IDKitWidget>
      {/* Keep minimal error display, can be improved with Shadcn components later */}
      {error && <p className="mt-2 text-xs text-red-600">Error: {error}</p>}
    </div>
  );
}
