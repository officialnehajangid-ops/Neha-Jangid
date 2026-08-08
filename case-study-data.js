// Case Study Data
const caseStudiesData = {
  "google-mandala": {
    title: "Project Mandala",
    subtitle: "North Star AI Vision",
    company: "Google",
    year: "2025",
    role: "Lead & Sole Designer",
    duration: "10 months",
    team: "Solo designer collaborating with 8 engineers, 2 PMs, 15+ marketing stakeholders",
    teamContext: "I was the sole designer embedded with 8 engineers, 2 PMs, and 15+ marketing stakeholders across Search, YouTube, and Cloud.",
    contributions: [
      "Owned all design work from discovery through launch",
      "Created 15+ concept explorations and retired several features we loved that tested poorly",
      "Built high-fidelity prototypes and interactive demos that secured executive buy-in",
      "Developed AI interaction principles defining how humans and AI collaborate",
      "Designed the component library and interaction patterns from scratch",
      "Facilitated cross-functional workshops aligning eng, product, and marketing",
    ],
    heroImage: "images/mandala2.gif",
    images: ["images/mandala2.gif", "images/mandala3.gif", "images/mandala5.gif"],
    orientation: "desktop",
    tldr: "Led 0-1 AI vision securing SVP buy-in. 60% faster campaigns, 45% productivity gains.",
    overview: "I led the strategic vision for a 0-1 AI-powered marketing platform that would transform how Google's 10,000+ marketers work, securing buy-in from the SVP of Marketing.",
    
    // Narrative sections with bold formatting (use <strong> in HTML)
    theProblem: "Marketing teams were drowning. They juggled <strong>200+ fragmented tools</strong>, losing 2.5 hours daily just switching context. <strong>73% of campaign delays</strong> came from compliance reviews happening too late in the process. New hires took 6-8 weeks to become productive because tribal knowledge lived in Slack threads and people's heads. The CMO was frustrated because campaigns that should take days were taking weeks.",
    
    theProcess: "I started by interviewing 12 marketers across different functions, shadowing their daily workflows. <strong>The insight that changed everything:</strong> they didn't need another tool to replace their existing ones. They needed something that could orchestrate across all of them. I ran 15+ concept explorations, testing ideas from full AI automation to simple dashboards. <strong>One humbling moment:</strong> my 'smart automation' concept had only 34% trust scores. Users didn't want AI making decisions for them. They wanted AI helping them make better decisions faster.",
    
    theSolution: "We built an AI assistant that sits across marketing workflows, not above them. It proactively flags compliance issues before they become blockers. It surfaces relevant past campaigns when you're starting something new. It drafts first versions while keeping humans in control. <strong>The key innovation was 'confidence indicators'</strong> where the AI shows its reasoning, so marketers can quickly verify or override suggestions.",
    
    theImpact: "The SVP of Marketing greenlit a dedicated team and budget after seeing the prototype. In pilots, <strong>campaign turnaround dropped 60%</strong>. <strong>Productivity increased 45%</strong>. User satisfaction jumped from <strong>34% to 89%</strong>, and the biggest driver was trust. One marketer told me: 'For the first time, I feel like the tools are working for me, not the other way around.'",
    
    theLearning: "The biggest lesson was about AI trust. Early on, I designed for efficiency, focused on how fast we could automate tasks. But users didn't want speed without understanding. <strong>When I shifted to 'AI as transparent collaborator' instead of 'AI as black-box assistant,' everything clicked.</strong> I also learned that executive buy-in requires showing the vision and the business case. My final presentation spent equal time on user stories and ROI projections.",

    challenge: "This wasn't an optimization project. It was a greenfield opportunity to reimagine the entire marketing workflow from scratch. The challenge was twofold: first, define a compelling North Star vision that could rally stakeholders around a future state nobody had seen before; second, prototype and validate that vision quickly enough to secure executive investment before competing initiatives consumed the budget.",
    problemStatement: "How might we define and validate a North Star vision for AI-powered marketing that earns executive buy-in and shapes Google's creative future?",
    constraints: [
      "Must integrate with existing Google infrastructure and security protocols",
      "Cannot disrupt ongoing campaigns during transition",
      "Needs to serve both veteran marketers and new hires with varying skill levels",
      "Must navigate internal politics around existing AI initiatives",
    ],
    researchInsights: [
      { finding: "The Tool Tax", detail: "Marketers spent an average of 2.5 hours daily just switching between tools and re-establishing context. That's 30% of their workday lost to friction." },
      { finding: "The Compliance Bottleneck", detail: "73% of campaign delays were caused by legal and brand compliance reviews that happened too late in the process." },
      { finding: "Onboarding Cliff", detail: "New marketers took 6-8 weeks to become productive, with most struggling to learn which tools to use when." },
      { finding: "Creative Burnout", detail: "'I became a project manager instead of a creative' - Sarah, Senior Marketing Manager. 85% of marketers felt their creative potential was underutilized." },
    ],
    failures: [
      {
        title: "The Everything Dashboard",
        description: "Our first prototype tried to show everything at once: every tool, every metric, every campaign. Users were overwhelmed. 'It's like you took all my problems and put them on one screen,' said one tester.",
        lesson: "Unification doesn't mean showing everything. It means showing the right thing at the right time."
      },
      {
        title: "Fully Automated Campaigns",
        description: "We built an AI that could generate entire campaigns autonomously. Marketers rejected it immediately. They wanted to be empowered, not replaced.",
        lesson: "AI should augment human creativity, not substitute for it. The magic is in collaboration, not automation."
      },
      {
        title: "Ignoring the Politics",
        description: "We initially tried to work around the existing Marketing PA team's AI toolbox. This created friction and turf wars that nearly derailed the project.",
        lesson: "Internal alignment is as important as user alignment. Bring stakeholders in early, or they'll become blockers."
      },
    ],
    pivots: [
      {
        from: "Replacing existing tools entirely",
        to: "Unified layer that orchestrates existing tools intelligently",
        impact: "Reduced implementation timeline from 18 months to 6 months"
      },
      {
        from: "AI generates final assets",
        to: "AI generates options and suggestions, humans make final calls",
        impact: "User trust scores jumped from 34% to 89%"
      },
      {
        from: "Competing with Marketing PA team",
        to: "Positioning Mandala as platform that amplifies their tools",
        impact: "Gained executive sponsorship and cross-team resources"
      },
    ],
    process: [
      {
        phase: "Research & Discovery",
        duration: "3 weeks",
        description: "Conducted intensive research sprint interviewing 12 marketers across different teams and seniority levels. Mapped the entire marketing tool ecosystem and identified the highest-friction moments in the campaign lifecycle.",
        activities: ["12 in-depth marketer interviews", "Tool ecosystem mapping (200+ tools)", "Workflow shadowing sessions", "Competitive analysis of marketing platforms"],
        image: "images/process-research.jpg",
      },
      {
        phase: "The Messy Middle",
        duration: "8 weeks",
        description: "Navigated significant ambiguity as we explored different unification approaches. Had to champion a clear design vision grounded in empathy while remaining flexible enough to evolve through constant feedback. Killed several 'darling' features that tested poorly.",
        activities: ["15+ concept explorations", "Internal stakeholder alignment workshops", "Paper prototyping with marketers", "Technical feasibility studies with engineering"],
        image: "images/process-iteration.jpg",
      },
      {
        phase: "Design & Refinement",
        duration: "10 weeks",
        description: "Developed the unified workspace with AI-powered briefing generation, real-time compliance flagging, and smart asset recommendations. Created a design system that felt distinctly Google while being intuitive for first-time users.",
        activities: ["High-fidelity prototyping", "AI interaction design patterns", "Compliance workflow integration", "Usability testing with 30+ users"],
        image: "images/process-final.jpg",
      },
      {
        phase: "Launch & Learn",
        duration: "Ongoing",
        description: "Rolled out to pilot teams first, gathering feedback and iterating rapidly. My leadership helped position Mandala as an indispensable platform, shifting mindsets from turf wars to collective success.",
        activities: ["Phased rollout strategy", "Analytics dashboard creation", "Training program development", "Continuous iteration cycles"],
        image: null,
      },
    ],
    outcomes: [
      { metric: "SVP", label: "Executive buy-in secured", context: "SVP of Marketing committed to continued investment" },
      { metric: "60%", label: "Faster campaign turnaround", context: "From weeks to days" },
      { metric: "45%", label: "Increase in productivity", context: "Measured via output per marketer" },
      { metric: "89%", label: "User satisfaction", context: "Up from 34% with previous tools" },
    ],
    reflection: "This project taught me that the hardest design problems aren't always about users. Sometimes they're about organizations. Navigating internal politics required me to lean into storytelling and user pain points to build momentum, aligning disparate teams under a shared vision. Mandala didn't just streamline workflows; it redefined how marketing happens at Google.",
    whatIWouldDoDifferently: "I would have engaged the Marketing PA team from day one instead of trying to work around them. The political capital we burned early on could have been avoided with better stakeholder mapping. Also, I underestimated how much change management training marketers would need. The tool was ready before the organization was.",
  },
  "google-garage": {
    title: "Marketing Garage",
    subtitle: "Unified Tool Discovery",
    company: "Google",
    year: "2023",
    role: "Lead Designer",
    duration: "19 months",
    team: "Lead designer on a team of 8 engineers, 2 PMs, and 15+ marketing stakeholders",
    teamContext: "I was the lead designer on a team of 8 engineers, 2 PMs, and 15+ marketing stakeholders across Search, YouTube, and Cloud.",
    contributions: [
      "Led all design work from discovery through launch",
      "Established four North Star Principles guiding product decisions",
      "Designed the unified tool discovery and access system",
      "Created AI-powered recommendations and smart search functionality",
      "Built the component library and interaction patterns",
      "Facilitated cross-functional workshops with eng, product, and marketing"
    ],
    heroImage: "images/mg-updates-1.gif",
    images: ["images/mg-updates-1.gif", "images/mg-updates-2.gif", "images/mg-updates-3.gif"],
    orientation: "desktop",
    tldr: "Led the redesign of Google's internal marketing tooling platform for 10,000+ marketers.",
    overview: "I led the redesign of Google's internal marketing tooling platform, creating a unified system that transformed how 10,000+ marketers discover, access, and use over 200 tools.",
    
    theProblem: "Google marketers were drowning in tool fragmentation. Over <strong>200+ tools</strong> existed across different teams, but <strong>only 23% of users found the tools they needed effective</strong>. Marketing teams lost hours weekly searching for the right tool, often using outdated or suboptimal solutions simply because they didn't know better options existed.",
    
    theProcess: "I started by interviewing marketers across different functions to understand their daily workflows. <strong>The breakthrough came from shadowing sessions:</strong> I watched users spend 15+ minutes searching for tools they'd used before. The problem wasn't the tools themselves—it was discoverability and context.",
    
    theSolution: "We built Marketing Garage as the single hub for all marketing tools. An AI-powered recommendation engine surfaces relevant tools based on your role, past usage, and current projects. Smart search understands marketing-specific queries. <strong>The key innovation was 'Just-in-Time Discovery':</strong> integrating tool suggestions directly into marketers' existing workflows.",
    
    theImpact: "<strong>CSAT scores improved significantly</strong> as users finally found tools that matched their needs. <strong>CUJs (Critical User Journeys) and tool requests both increased substantially</strong>, showing higher engagement with the platform. Marketers reported spending far less time searching for tools.",
    
    theLearning: "The biggest lesson was that <strong>tool effectiveness isn't about the tools—it's about connecting people to the right tool at the right time.</strong> Early on, I focused on improving individual tool UX, but the real leverage was in the discovery layer.",

    challenge: "Google marketers were juggling over 200 fragmented tools, with only 23% finding the tools they needed effective. The scattered ecosystem created knowledge silos where tribal expertise lived in Slack threads and individual teams.",
    problemStatement: "How might we help marketers discover and access the right tools at the right time?",
    constraints: [
      "Must integrate with existing Google infrastructure",
      "Needs to serve 10,000+ marketers with varying skill levels",
      "Cannot disrupt ongoing workflows during transition"
    ],
    researchInsights: [
      { finding: "Tool Fragmentation", detail: "Over 200+ tools existed across different teams, creating confusion and inefficiency." },
      { finding: "Low Effectiveness", detail: "Only 23% of users found the tools they needed effective for their work." },
      { finding: "Discovery Friction", detail: "Users spent 15+ minutes searching for tools they'd used before." }
    ],
    failures: [
      {
        title: "Tool Directory Approach",
        description: "First attempt was a simple directory listing all tools alphabetically. Users couldn't find relevant tools without knowing what to search for.",
        lesson: "Discovery requires context, not just organization."
      }
    ],
    pivots: [
      {
        from: "Simple tool directory",
        to: "AI-powered contextual recommendations",
        impact: "Tool discovery time reduced significantly"
      }
    ],
    process: [
      {
        phase: "Research & Discovery",
        duration: "4 weeks",
        description: "Interviewed marketers across different functions and conducted shadowing sessions to understand daily workflows and pain points.",
        activities: ["User interviews", "Workflow shadowing", "Tool ecosystem mapping"],
        image: "images/process-research.jpg"
      },
      {
        phase: "Design & Iteration",
        duration: "12 weeks",
        description: "Developed the unified discovery system with AI-powered recommendations and smart search functionality.",
        activities: ["Prototyping", "User testing", "Design system creation"],
        image: "images/process-iteration.jpg"
      }
    ],
    outcomes: [
      { metric: "200+", label: "Tools unified", context: "Single discovery platform" },
      { metric: "10K+", label: "User base", context: "Marketers served" },
      { metric: "↑ CSAT", label: "Tool effectiveness", context: "Improved satisfaction" },
      { metric: "↑ CUJs", label: "Engagement", context: "Increased usage" }
    ],
    reflection: "This project taught me that tool effectiveness isn't about the tools themselves—it's about connecting people to the right tool at the right time.",
    whatIWouldDoDifferently: "I would have established the four North Star Principles earlier in the process to align stakeholders faster."
  },
  "google-ai-explorations": {
    title: "AI Explorations",
    subtitle: "Early-Stage AI Concepts",
    company: "Google",
    year: "2025",
    role: "Lead Designer",
    duration: "2025",
    team: "Various cross-functional teams across Google Marketing",
    teamContext: "Various cross-functional teams across Google Marketing",
    contributions: [
      "Led concept development and vision prototyping",
      "Created interactive demos for stakeholder alignment",
      "Explored novel AI interaction patterns"
    ],
    heroImage: "",
    tldr: "A collection of early-stage AI concepts exploring how generative AI could transform marketing workflows.",
    overview: "A collection of early-stage AI concepts I led at Google, exploring how generative AI could transform marketing workflows.",
    
    theProblem: "",
    theProcess: "",
    theSolution: "",
    theImpact: "",
    theLearning: "",

    challenge: "",
    problemStatement: "",
    constraints: [],
    researchInsights: [],
    failures: [],
    pivots: [],
    process: [],
    outcomes: [
      { metric: "5", label: "Concepts", context: "AI exploration prototypes" }
    ],
    reflection: "",
    whatIWouldDoDifferently: "",
    explorations: [
      {
        id: "ai-audiences",
        title: "AI Audiences Concept",
        description: "Exploring AI-powered audience segmentation and targeting for smarter campaign delivery.",
        video: "images/ai-audiences-concept.mp4"
      },
      {
        id: "persona-agent",
        title: "GML Persona Agent",
        description: "An AI agent that generates and iterates on marketing personas through natural conversation.",
        video: "images/gml-persona-agent.mp4"
      },
      {
        id: "vision-work-3",
        title: "Creative Vision Exploration",
        description: "Conceptualizing AI-assisted creative development workflows for marketing teams.",
        video: "images/vision-work-3.mp4"
      },
      {
        id: "vision-work-4",
        title: "Campaign Intelligence",
        description: "AI-driven insights and recommendations for optimizing campaign performance.",
        video: "images/vision-work-4.mp4"
      },
      {
        id: "asset-studio",
        title: "Asset Studio MVP",
        description: "A prototype for AI-generated marketing assets with brand consistency controls.",
        video: "images/asset-studio-mvp.mp4"
      }
    ]
  },
  "linkedin-hiring": {
    title: "LinkedIn Hiring",
    subtitle: "Transforming Small Business Recruiting",
    company: "LinkedIn",
    year: "2021",
    role: "Lead & Sole Designer",
    duration: "8 months",
    team: "Solo designer collaborating with 6 engineers and 1 PM",
    teamContext: "I was the sole designer working with 6 engineers and 1 PM, reporting to the SMB product lead.",
    contributions: [
      "Owned end-to-end design from research through launch",
      "Designed the swipe-based candidate review system for mobile",
      "Led usability testing with 30+ small business owners",
      "Created one-tap actions and smart default patterns",
      "Developed design principles that shaped product decisions",
      "Ran A/B testing strategy for candidate cards and rejection flows",
    ],
    heroImage: "images/linkedin-future.mp4",
    images: ["images/linkedin-future.mp4", "images/linkedin-rate.mp4", "images/linkedin-reject.mp4", "images/linkedin-yoe.mp4", "images/linkedin-message.mp4"],
    orientation: "mobile",
    tldr: "Redesigned SMB hiring for busy owners. 60% more hires, 185% more responses.",
    overview: "I redesigned LinkedIn's hiring experience for small business owners who had less than 20 minutes daily for recruiting, and were defecting to Indeed at alarming rates.",
    
    theProblem: "Small business owners told us the same thing: 'I have 17 minutes during lunch to look at candidates, and LinkedIn makes it impossible.' <strong>68% wanted to hire from their phones</strong>, but LinkedIn's mobile hiring experience was essentially broken. The desktop app was designed for HR professionals with hours to spend, not bakery owners hiring between customers. <strong>42% of our SMB users had already switched to Indeed</strong>, citing 'simplicity.'",
    
    theProcess: "I ran diary studies during actual hiring cycles, asking business owners to screenshot their frustrations in real-time. <strong>The insight that changed our direction:</strong> they didn't want a simpler version of enterprise LinkedIn. They needed something built for their reality from the ground up. <strong>My first attempt didn't resonate in testing.</strong> Users said it felt 'like LinkedIn was apologizing for itself.' So I started over with mobile-first principles.",
    
    theSolution: "We built a <strong>Tinder-like swipe interface</strong> for candidate review. You see a candidate card with the key info, then swipe right to move forward or left to pass. One-tap rejection templates that feel personal. Smart defaults that learn from your hiring patterns. <strong>The entire flow could be completed in under a minute per candidate</strong>, down from 4 minutes.",
    
    theImpact: "<strong>Successful hires increased 60%.</strong> Candidate response rates jumped <strong>185%</strong> because employers were actually responding. <strong>Mobile engagement increased 340%.</strong> Review time dropped from 4 minutes to 30 seconds. We beta tested with 500 businesses before rolling out. One restaurant owner said: 'I hired my best server ever while waiting for my kid's soccer practice to end.'",
    
    theLearning: "I learned that <strong>'simple' doesn't mean 'less.' It means 'right-sized.'</strong> My first instinct was to remove features, but the real solution was rethinking the interaction model entirely. I also discovered that speed isn't just convenience for busy users. It's respect. When we made hiring faster, employers responded to more candidates, which made the whole marketplace healthier.",

    challenge: "LinkedIn's recruiting tools were built for enterprise HR teams with dedicated recruiters, not small business owners wearing multiple hats. The existing experience required desktop access, deep product knowledge, and significant time investment. These are luxuries small business owners simply don't have.",
    problemStatement: "How might we make hiring on LinkedIn simple enough for a busy small business owner to manage in under 20 minutes a day?",
    constraints: [
      "Must work seamlessly on mobile devices",
      "Cannot require training or onboarding",
      "Needs to feel valuable at LinkedIn's price point",
      "Must not cannibalize enterprise recruiter product",
    ],
    researchInsights: [
      { finding: "The 20-Minute Window", detail: "Small business owners have an average of 17 minutes per day for hiring tasks, usually done between other responsibilities or during commutes." },
      { finding: "Mobile or Nothing", detail: "68% of small business owners wanted to review candidates on mobile, but LinkedIn's mobile hiring experience was essentially non-functional." },
      { finding: "Rejection Guilt", detail: "'I feel terrible not responding to applicants, but I just don't have time.' Small business owners wanted to be human but couldn't manage the volume." },
      { finding: "Indeed Defection", detail: "42% of surveyed small businesses had switched to Indeed in the past year, citing simplicity and mobile access as primary reasons." },
    ],
    failures: [
      {
        title: "The LinkedIn Recruiter Lite",
        description: "Our first approach was to simplify the enterprise Recruiter product. We stripped features until it was 'lite,' but it still felt like a complex tool made simpler, not a simple tool made for them.",
        lesson: "Simplification isn't the same as designing for simplicity. You can't sand down a battleship and call it a speedboat."
      },
      {
        title: "Automated Everything",
        description: "We built AI that would automatically screen, respond to, and schedule candidates. Small business owners hated it. Hiring felt too personal to automate entirely.",
        lesson: "Automation should handle the tedious, not the meaningful. Small business owners want efficiency, not detachment."
      },
      {
        title: "Complex Filtering System",
        description: "Added 15+ filter options so users could precisely narrow candidates. Nobody used them. They wanted quick scanning, not complex queries.",
        lesson: "Features that work for power users can overwhelm casual users. Context matters more than capability."
      },
    ],
    pivots: [
      {
        from: "Feature-stripped enterprise product",
        to: "Mobile-first experience designed from scratch",
        impact: "Mobile engagement increased 340%"
      },
      {
        from: "Complex candidate filtering",
        to: "Swipe-based candidate cards with smart defaults",
        impact: "Time to review candidate dropped from 4 min to 30 sec"
      },
      {
        from: "Manual rejection messages",
        to: "One-tap rejection templates that feel personal",
        impact: "185% increase in candidate feedback"
      },
    ],
    process: [
      {
        phase: "Research & Discovery",
        duration: "4 weeks",
        description: "Dove deep into the recruiter's world. Conducted 15 interviews with small business owners, tested competitor products including Indeed and ZipRecruiter, and analyzed usage data from LinkedIn's existing tools.",
        activities: ["Small business owner interviews", "Competitor analysis (Indeed, ZipRecruiter, Glassdoor)", "Mobile usage analytics review", "Diary studies during hiring cycles"],
        image: "images/process-research.jpg",
      },
      {
        phase: "The Messy Middle",
        duration: "6 weeks",
        description: "Partnered with cross-functional teams to define design principles: make hiring simpler, faster, and more human. Explored dozens of interaction patterns from swipe gestures to voice commands. Not every idea made it. Through constant iteration, we focused on what truly mattered.",
        activities: ["Interaction pattern exploration", "Paper prototyping sessions", "Design principle workshops", "Technical constraint mapping"],
        image: "images/process-iteration.jpg",
      },
      {
        phase: "Design & Refinement",
        duration: "8 weeks",
        description: "Designed the swipe-based candidate card system, one-tap rejection templates, smart filters, and the mobile-first job management dashboard. Every feature was built with user needs front and center.",
        activities: ["High-fidelity mobile prototypes", "Usability testing with 30+ small business owners", "A/B testing candidate card layouts", "Accessibility optimization"],
        image: "images/process-final.jpg",
      },
      {
        phase: "Launch & Learn",
        duration: "Ongoing",
        description: "Rolled out to beta users, then gradually expanded. Established feedback loops and continuously shipped improvements based on real recruiter behavior and satisfaction metrics.",
        activities: ["Beta program with 500 businesses", "In-app feedback collection", "Metrics dashboard creation", "Continuous iteration"],
        image: null,
      },
    ],
    outcomes: [
      { metric: "60%", label: "More successful hires", context: "Jobs leading to filled positions" },
      { metric: "185%", label: "More candidate feedback", context: "Applicants receiving responses" },
      { metric: "2.5x", label: "Applicant visibility", context: "More candidates reviewed per session" },
      { metric: "340%", label: "Mobile engagement", context: "Increase in mobile hiring activity" },
    ],
    reflection: "This project taught me that designing for constraints can be liberating. The 20-minute limitation forced us to question every feature and interaction. We made it easier for small businesses to find great talent and helped real people feel more confident and in control of their hiring journey. The impact was clear, not just in metrics, but in the stories we heard from business owners who finally felt like LinkedIn understood them.",
    whatIWouldDoDifferently: "I'd push harder for candidate-side research earlier. We focused so much on the recruiter experience that we initially overlooked how candidates experienced rejection templates and automated responses. Adding that perspective mid-project required significant rework.",
  },
  "apple-atlas": {
    title: "Apple ATLAS",
    subtitle: "Training Platform Redesign",
    company: "Apple",
    year: "2019",
    role: "Lead & Sole Designer",
    duration: "14 months",
    team: "Solo designer collaborating with 12 engineers and 3 content strategists",
    teamContext: "I was the sole designer working with 12 engineers and 3 content strategists, partnering closely with Apple Retail leadership.",
    contributions: [
      "Led all design work for the complete platform redesign",
      "Created the design system and component library from scratch",
      "Built prototypes for stakeholder presentations and testing",
      "Partnered with research to run studies with 40+ employees",
      "Ensured WCAG 2.1 AA accessibility compliance",
      "Designed personalization and gamification approaches",
    ],
    heroImage: "images/atlas-homepage.png",
    images: ["images/atlas-homepage.png", "images/atlas-demo.gif", "images/atlas-mocks.png", "images/atlas-personalization.png", "images/atlas-styleguide.png"],
    orientation: "desktop",
    tldr: "Rebuilt training platform for 500K+ users. 73% more completions, 4.6★ rating.",
    overview: "I rebuilt Apple's decade-old employee training platform from the ground up, launching to 200K employees and scaling to 500K+ users including retail partners.",
    
    theProblem: "ATLAS was a relic. Built a decade ago, it <strong>failed 23 WCAG accessibility criteria</strong>. <strong>85% of training content wasn't relevant</strong> to users' actual roles. A Genius Bar technician saw the same modules as a business sales specialist. It took 7 clicks just to reach content. Most employees avoided ATLAS entirely, preferring to ask colleagues. The platform had a <strong>2.1-star internal rating</strong>, and 'ATLAS' had become synonymous with frustration.",
    
    theProcess: "I ran heuristic evaluations and task-based studies with 40+ employees across 8 departments and 4 countries. <strong>The turning point:</strong> watching a retail employee in Tokyo struggle with the same issues as someone in Austin. The problems were universal. <strong>My first concept didn't resonate.</strong> Netflix-style browsing ('discover training you'll love!') missed the mark because employees didn't want to browse. They wanted to get certified and get back to customers. I also over-engineered gamification initially, which felt out of place for experienced professionals.",
    
    theSolution: "We built <strong>goal-oriented learning paths</strong> instead of content libraries. The system knows your role, your certifications, and what's coming up. Personalized dashboards show exactly what you need to complete and why it matters. We replaced gamification overload with <strong>meaningful milestones</strong>, celebrating real achievements like 'first week on the floor' rather than arbitrary point thresholds. The accessibility overhaul made it usable for everyone.",
    
    theImpact: "We launched to 200K Apple employees, then <strong>500K+ in the first week</strong> as partners like Sprint and Best Buy came online. <strong>Course completion increased 73%.</strong> The internal rating jumped from <strong>2.1 to 4.6 stars</strong>. Mobile learning engagement increased 156%. The biggest win was qualitative: people stopped complaining about ATLAS and started recommending courses to each other.",
    
    theLearning: "I learned that <strong>enterprise software fails when it treats employees like captive audiences instead of customers</strong>. The same design principles that make consumer apps delightful (relevance, speed, respect for time) apply even more when users are required to use your product. I also learned the power of accessible design: features I built for employees with disabilities ended up benefiting everyone.",

    challenge: "ATLAS had become a patchwork of legacy systems, bolted-on features, and workarounds. Employees dreaded using it. Navigation was confusing, content was one-size-fits-all, and the platform didn't meet modern accessibility standards. For a company that prides itself on user experience, this internal tool was an embarrassment.",
    problemStatement: "How might we transform a frustrating, outdated training platform into an engaging learning experience that employees actually want to use?",
    constraints: [
      "Must support 200,000+ concurrent users globally",
      "Needs to work across all Apple devices and platforms",
      "Must meet WCAG 2.1 AA accessibility standards",
      "Cannot disrupt ongoing training programs during transition",
      "Content must adapt to different roles and experience levels",
    ],
    researchInsights: [
      { finding: "The Dreaded Click", detail: "'I know what I need, but it takes 7 clicks to get there.' Employees spent more time navigating than learning." },
      { finding: "Irrelevance Fatigue", detail: "85% of content served to employees wasn't relevant to their specific role or current knowledge level. They were drowning in information meant for someone else." },
      { finding: "Accessibility Gaps", detail: "The platform failed 23 WCAG criteria. Employees with visual or motor impairments couldn't effectively use the system." },
      { finding: "The 'I'll Figure It Out' Mentality", detail: "Employees avoided ATLAS entirely, preferring to ask colleagues or search online rather than deal with the frustrating interface." },
    ],
    failures: [
      {
        title: "The Netflix of Learning",
        description: "We initially designed a content-first experience similar to streaming services, with algorithmic recommendations and endless scrolling. It tested terribly. Learning isn't entertainment, and employees wanted structure, not exploration.",
        lesson: "Don't force consumer design patterns onto enterprise contexts. Learning requires intentionality that entertainment doesn't."
      },
      {
        title: "Gamification Overload",
        description: "Added badges, points, leaderboards, and achievements everywhere. Senior employees felt it didn't respect their expertise, and new hires found it distracting from actual learning.",
        lesson: "Gamification should support goals, not become the goal. Light touches work better than heavy-handed game mechanics."
      },
      {
        title: "Personalization Without Permission",
        description: "Built sophisticated personalization that tracked learning behavior. Users felt surveilled. Trust matters, especially in an employee context.",
        lesson: "Personalization must be transparent and opt-in. Employees need to understand and control how data shapes their experience."
      },
    ],
    pivots: [
      {
        from: "Content-first browsing experience",
        to: "Goal-oriented learning paths with clear progression",
        impact: "Course completion rates increased 73%"
      },
      {
        from: "Passive badges and points",
        to: "Meaningful milestones tied to real-world skills",
        impact: "Employee satisfaction with gamification went from 23% to 78%"
      },
      {
        from: "One global design",
        to: "Responsive, device-optimized experiences",
        impact: "Mobile learning engagement increased 156%"
      },
    ],
    process: [
      {
        phase: "Research & Discovery",
        duration: "6 weeks",
        description: "Conducted heuristic evaluations and task-based usability studies across multiple employee segments. Identified critical friction points in navigation, accessibility, and content delivery. Audited the entire platform against WCAG 2.1 standards.",
        activities: ["Heuristic evaluation of existing platform", "Task-based usability studies with 40+ employees", "Accessibility audit (WCAG 2.1)", "Stakeholder interviews across 8 departments"],
        image: "images/process-research.jpg",
      },
      {
        phase: "The Messy Middle",
        duration: "10 weeks",
        description: "Crafted a new design system and style guide to lay the groundwork for a modern, functional, and inclusive platform. Accessibility was non-negotiable, and so was personalization. ATLAS needed to feel like it was built for each user, not just every user.",
        activities: ["Design system creation", "Component library development", "Accessibility pattern research", "Learning experience exploration"],
        image: "images/process-iteration.jpg",
      },
      {
        phase: "Design & Refinement",
        duration: "12 weeks",
        description: "Built out the full experience: personalized dashboards, responsive layouts, smart navigation, and thoughtful gamification. Worked cross-functionally with engineering, content strategists, and leadership to ensure the experience reflected Apple's commitment to excellence.",
        activities: ["High-fidelity prototyping", "Cross-device responsive design", "Content strategy integration", "Beta testing with 1,000 employees"],
        image: "images/process-final.jpg",
      },
      {
        phase: "Launch & Learn",
        duration: "Ongoing",
        description: "Phased global rollout starting with retail employees, then expanding to corporate and partners. Established feedback mechanisms and continuous improvement processes.",
        activities: ["Phased global rollout", "Partner onboarding (Sprint, Best Buy)", "Real-time analytics monitoring", "Continuous iteration"],
        image: null,
      },
    ],
    outcomes: [
      { metric: "200K", label: "Initial users", context: "Global employee launch" },
      { metric: "500K+", label: "First week users", context: "Including partners" },
      { metric: "73%", label: "Higher completion", context: "Course completion rates" },
      { metric: "4.6★", label: "Employee rating", context: "Up from 2.1★" },
    ],
    reflection: "ATLAS taught me that internal tools deserve the same design rigor as customer-facing products. Maybe more, because employees don't have a choice about using them. The feedback was overwhelmingly positive, with users highlighting the fresh design, improved usability, and how the platform actually made them want to learn. ATLAS didn't just train employees; it raised the bar for learning at Apple.",
    whatIWouldDoDifferently: "I would have involved content strategists earlier and more deeply. We designed beautiful containers before fully understanding the content that would fill them, which required significant rework. Also, I underestimated the change management challenge. The platform was ready before the organization's training programs were restructured to take advantage of it.",
  },
  "ebay-returns": {
    title: "eBay Returns",
    subtitle: "Fixing a $100M Problem",
    company: "eBay",
    year: "2018",
    role: "Lead & Sole Designer",
    duration: "6 months",
    team: "Solo designer collaborating with 4 engineers, 1 PM, and 1 researcher",
    teamContext: "I was the sole designer working with 4 engineers, 1 PM, and 1 researcher on the Returns Experience team.",
    contributions: [
      "Owned all design work for the returns redesign",
      "Created end-to-end user flows and prototypes",
      "Partnered with research on interviews and usability testing",
      "Designed contextual smart-defaults and notification systems",
      "Developed the $5 auto-refund concept from user insights",
      "Led rapid prototyping testing 6 concepts with 30+ users",
    ],
    heroImage: "images/ebay-5-dollar-return.gif",
    images: ["images/ebay-5-dollar-return.gif", "images/ebay-expensive-return.gif", "images/ebay-schedule-pickup.gif"],
    orientation: "mobile",
    tldr: "Transformed the returns experience. 64% faster, $2.3M saved annually.",
    overview: "I transformed eBay's confusing returns experience, a $100M problem, into a trust-building moment that saved $2.3M annually.",
    
    theProblem: "Returns were where eBay lost customers. The return form asked <strong>12 questions upfront</strong>, even for a $3 item. <strong>34% of users abandoned mid-flow.</strong> Users had zero visibility into timelines, calling support just to ask 'where's my refund?' <strong>67% of users who had a bad return experience either reduced purchasing or left eBay entirely.</strong> The $100M 'returns problem' was really a $100M trust problem.",
    
    theProcess: "I interviewed 15 buyers and 8 sellers, and listened to dozens of customer service calls. <strong>The insight:</strong> returns weren't failing because of bad UI. They were failing because of bad information architecture. We were asking questions we already knew the answers to and hiding information users desperately needed. I tested 6 major concepts with 30+ users. <strong>Some didn't work at all</strong>, including a 'chat-based' return flow that confused everyone.",
    
    theSolution: "We replaced the 12-question form with a <strong>3-step contextual flow</strong>. The system knows what you bought and when, so it only asks what it doesn't know. For items under $5, we introduced <strong>auto-refunds</strong> where you keep the item and get your money back instantly. We added real-time timeline visibility: 'Your refund will arrive by Thursday.' And we integrated <strong>USPS at-home pickup</strong> so users didn't have to find a box or visit a store.",
    
    theImpact: "<strong>Return completion became 64% faster.</strong> Drop-offs decreased 52%. The auto-refund program <strong>saved $2.3M annually</strong>. Support calls dropped 34%. 23% of returns used the new at-home pickup option. But the metric I'm proudest of: <strong>post-return purchase intent increased.</strong> Returns stopped being the end of a customer relationship and started being proof that eBay had your back.",
    
    theLearning: "I learned that <strong>friction isn't always about number of steps. It's about cognitive load.</strong> The new flow had similar steps but felt effortless because each step made sense in context. I also learned that sometimes the best solution involves doing less: the auto-refund feature succeeded by recognizing that some returns aren't worth processing at all. Knowing when not to design is a design skill.",

    challenge: "eBay's return process had evolved organically over years, resulting in a fragmented experience with multiple pathways, inconsistent information, and unclear expectations. Users didn't know how long returns would take, whether they'd get their money back, or what steps they needed to follow. Every point of confusion translated into support calls, abandoned returns, and lost trust.",
    problemStatement: "How might we transform a frustrating, high-friction return process into a trust-building experience that users feel good about?",
    constraints: [
      "Must work across millions of seller policies and item types",
      "Cannot significantly increase seller burden",
      "Needs to reduce customer service volume, not just shift it",
      "Must maintain eBay's marketplace model (buyer-seller relationship)",
    ],
    researchInsights: [
      { finding: "Expectation Mismatch", detail: "'I thought I'd have my money back in 2 days. It took 2 weeks.' Users had no visibility into realistic timelines, leading to anxiety and support calls." },
      { finding: "Cognitive Overload", detail: "The return form asked 12 questions upfront, many of which weren't relevant to the user's situation. 34% of users abandoned at this step." },
      { finding: "The Low-Value Return Paradox", detail: "Users were required to ship back items worth less than the shipping cost. 'I'm returning a $3 phone case and they want me to pay $8 shipping?' Both parties lost." },
      { finding: "Trust Erosion", detail: "67% of users who had a bad return experience reduced their eBay purchasing or left entirely. Returns were destroying customer lifetime value." },
    ],
    failures: [
      {
        title: "The Uber-Style Returns",
        description: "Designed a real-time tracking experience showing exactly where the return package was, with live ETAs for refund. Engineering said it was technically impossible with carrier integration limitations.",
        lesson: "Dream big, but validate technical feasibility early. The best design is worthless if it can't be built."
      },
      {
        title: "Chatbot Resolution",
        description: "Built an AI chatbot to handle return questions and initiate returns. Users found it frustrating. They wanted to accomplish a task, not have a conversation about it.",
        lesson: "Chatbots work for discovery, not for transactions. When users know what they want, give them a clear path, not a conversation."
      },
      {
        title: "Seller-First Messaging",
        description: "Initially designed messaging that protected seller interests, explaining all the reasons a return might be denied. Users felt like eBay was working against them.",
        lesson: "In a marketplace, the platform must feel fair to both sides, but the user initiating the action needs to feel supported, not interrogated."
      },
    ],
    pivots: [
      {
        from: "12-question return form",
        to: "3-step contextual flow with smart defaults",
        impact: "Form completion rate increased from 66% to 94%"
      },
      {
        from: "Ship back everything",
        to: "$5 auto-refund for low-value items",
        impact: "Saved $2.3M annually in shipping and processing"
      },
      {
        from: "User finds shipping solution",
        to: "USPS at-home pickup integration",
        impact: "23% of returns used new pickup option"
      },
    ],
    process: [
      {
        phase: "Research & Discovery",
        duration: "3 weeks",
        description: "Spoke directly with users, mapped emotional highs and lows in the return journey, and studied how competitors like Amazon and Walmart handled returns. Identified five key pain points: unmet expectations, lack of transparency, cognitive overload, slow resolutions, and inconsistency.",
        activities: ["User interviews (15 buyers, 8 sellers)", "Emotional journey mapping", "Competitive analysis (Amazon, Walmart, Target)", "Customer service call analysis"],
        image: "images/process-research.jpg",
      },
      {
        phase: "The Messy Middle",
        duration: "4 weeks",
        description: "Defined clear design principles: make it simple, proactive, human, and helpful. Explored radical ideas (instant refunds, no-questions-asked) alongside incremental improvements. Tested six major prototypes with over 30 users.",
        activities: ["Design principle definition", "Rapid prototyping (6 major concepts)", "Usability testing with 30+ users", "Seller impact assessment"],
        image: "images/process-iteration.jpg",
      },
      {
        phase: "Design & Refinement",
        duration: "6 weeks",
        description: "Small changes made a big difference: status indicators, streamlined navigation, contextual help, and clear next steps. Designed the $5 auto-refund system and USPS at-home pickup integration. Created smart notification system to keep users informed without overwhelming them.",
        activities: ["High-fidelity flow design", "Auto-refund logic development", "Notification system design", "A/B test planning"],
        image: "images/process-final.jpg",
      },
      {
        phase: "Launch & Learn",
        duration: "Ongoing",
        description: "Rolled out in phases, measuring impact at each stage. Even after I moved on to my next role, the rollout continued to show positive results across the board.",
        activities: ["Phased rollout (5% → 25% → 100%)", "A/B testing results analysis", "Customer service impact tracking", "Continuous optimization"],
        image: null,
      },
    ],
    outcomes: [
      { metric: "64%", label: "Faster completion", context: "Average time to complete return" },
      { metric: "52%", label: "Fewer drop-offs", context: "Users completing full return flow" },
      { metric: "$2.3M", label: "Annual savings", context: "From auto-refund program" },
      { metric: "34%", label: "Fewer support calls", context: "Return-related inquiries" },
    ],
    reflection: "This project proved that user-centered design doesn't just improve experiences. It drives real business results and builds long-term trust with customers. A return isn't a failure; it's a moment of truth. Handle it well, and you've got a customer for life. Handle it poorly, and you've lost them forever. The most impactful feature, the $5 auto-refund, came from deeply understanding the economics of returns, not just the emotions.",
    whatIWouldDoDifferently: "I'd spend more time with sellers early on. We optimized heavily for buyer experience and had to retrofit seller considerations later. Also, I underestimated how much internal alignment would be needed. Finance, legal, and customer service all had strong opinions about return policies that we didn't surface until late in the process.",
  },
};
