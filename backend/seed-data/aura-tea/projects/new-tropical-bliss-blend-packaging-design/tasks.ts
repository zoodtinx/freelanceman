import { getRelativeDate } from "seed-data/helpers/getRelativeDate";

export const generateNewTropicalBlissBlendPackagingDesignTasks = (userId: string, clientId: string, projectId: string) => {
    return [
        {
            name: "Source high-resolution tropical fruit imagery",
            status: "pending",
            dueAt: getRelativeDate(3, false),
            details: "Identify and download high-quality, vibrant images of tropical fruits for various packaging elements. Prioritize clarity and color saturation. Check licensed stock photo sites first.",
            link: "https://www.istockphoto.com/photos/tropical-fruit",
            isWithTime: false, // This task doesn't require a specific time
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Develop Concept 1: Minimalist Packaging Layout",
            status: "pending",
            dueAt: getRelativeDate(6, true), // Now includes specific time
            details: "Create the first packaging design concept focusing on a clean, elegant, and minimalist aesthetic. Incorporate the approved color palette and core brand elements. Ensure scalability for different package sizes.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Develop Concept 2: Vibrant & Energetic Packaging Layout",
            status: "pending",
            dueAt: getRelativeDate(6, true), // Now includes specific time
            details: "Design the second packaging concept to be bold, colorful, and energetic, reflecting the 'Tropical Bliss' name. Experiment with dynamic typography and fruit arrangements.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Develop Concept 3: Premium & Textured Packaging Layout",
            status: "pending",
            dueAt: getRelativeDate(6, true), // Now includes specific time
            details: "Craft the third packaging concept with a focus on premium feel and subtle textures. Explore finishes and material suggestions that would elevate the product's perceived value.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Prepare Client Presentation Deck",
            status: "pending",
            dueAt: getRelativeDate(7, true), // Now includes specific time
            details: "Compile all three packaging concepts into a clear, compelling presentation. Include mockups, rationale behind each design, and potential material suggestions for Aura Tea Co.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Send Packaging Concepts for Client Review",
            status: "pending",
            dueAt: getRelativeDate(7, true), // Already had specific time, kept it
            details: "Upload the presentation deck and all necessary files to the client's preferred platform and formally notify them for review. Confirm feedback deadline.",
            link: "https://clientportal.auratea.com/design-review",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Incorporate Client Feedback (Round 1)",
            status: "completed",
            dueAt: getRelativeDate(-5, true), // Now includes specific time
            details: "Reviewed and applied all initial feedback received from Aura Tea Co. on the chosen packaging concept. Focused on minor adjustments to color and typography.",
            isWithTime: true,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Prepare Final Print-Ready Packaging Files",
            status: "completed",
            dueAt: getRelativeDate(-2, false), // Kept without specific time
            details: "Finalized all design elements, ensured proper bleeds, trims, and color profiles (CMYK) for print production. Packaged all fonts and linked assets.",
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
        {
            name: "Deliver Final Packaging Files to Client",
            status: "completed",
            dueAt: getRelativeDate(-1, false), // Kept without specific time
            details: "Uploaded the comprehensive final packaging asset package to the client's secure cloud storage and confirmed receipt.",
            isWithTime: false,
            userId: userId,
            clientId: clientId,
            projectId: projectId,
        },
    ];
};