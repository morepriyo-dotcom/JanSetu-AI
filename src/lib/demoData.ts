import { Complaint } from "@/types/complaint";

export const SAMPLE_COMPLAINTS: Complaint[] = [
  {
    id: "JS-2026-1001",
    title: "Hazardous Deep Pothole outside Engineering College Main Gate",
    description:
      "There is a massive 2-foot wide pothole right in front of the college main gate on MG Road. Two two-wheelers skidded and fell yesterday during evening rush hour. Highly dangerous especially after dark.",
    category: "ROADS",
    issue: "Severe Pothole & Road Hazard",
    priority: "HIGH",
    department: "Municipal Roads & Infrastructure Department",
    summary:
      "Deep crater-like pothole outside educational institution creating recurring road accidents for motorcyclists.",
    recommendedAction:
      "Immediate temporary cold-asphalt filling within 24 hours, followed by bituminous resurfacing.",
    location: {
      address: "Near Gate 2, Government Engineering College, MG Road, Ward 14",
      latitude: 18.5204,
      longitude: 73.8567,
      city: "Pune",
      landmark: "Opposite College Cafeteria",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    status: "IN_PROGRESS",
    citizenName: "Aarav Sharma",
    citizenPhone: "+91 98234 11201",
    createdAt: "2026-09-27T09:30:00.000Z",
    updatedAt: "2026-09-28T14:15:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-27T09:30:00.000Z",
        note: "Citizen grievance logged via JanSetu AI with automated Gemini triage.",
        updatedBy: "System (Citizen Submission)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-27T11:45:00.000Z",
        note: "Assigned to Ward 14 Junior Engineer (Road Works).",
        updatedBy: "Municipal Admin Desk",
      },
      {
        status: "IN_PROGRESS",
        timestamp: "2026-09-28T14:15:00.000Z",
        note: "Repair squad dispatched with quick-setting cold mix patch asphalt.",
        updatedBy: "Junior Engineer K. Deshmukh",
      },
    ],
  },
  {
    id: "JS-2026-1002",
    title: "Overflowing Community Dumpster near Weekly Vegetable Market",
    description:
      "Garbage has not been collected for four consecutive days at the market corner. Stray cattle and dogs are scattering waste across the street, causing a severe stench and public health menace.",
    category: "SANITATION",
    issue: "Garbage Accumulation & Stench",
    priority: "HIGH",
    department: "Solid Waste Management Department",
    summary:
      "Community dumpster overflowing into active pedestrian vegetable market zone, breeding flies and foul odor.",
    recommendedAction:
      "Deploy tipper compactor truck for urgent clearance and spray bleaching powder/disinfectant.",
    location: {
      address: "Subhash Chowk Mandi, Sector 7, Ward 22",
      latitude: 28.6139,
      longitude: 77.209,
      city: "Delhi NCR",
      landmark: "Behind Central Mandi Office",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80",
    status: "ASSIGNED",
    citizenName: "Priya Sundaram",
    citizenPhone: "+91 98110 55432",
    createdAt: "2026-09-28T08:10:00.000Z",
    updatedAt: "2026-09-28T10:00:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-28T08:10:00.000Z",
        note: "Grievance registered. Gemini categorized under Solid Waste Management.",
        updatedBy: "System (Citizen Submission)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-28T10:00:00.000Z",
        note: "Assigned to Sanitation Inspector Ward 22 morning cleanup crew.",
        updatedBy: "Sanitation Control Room",
      },
    ],
  },
  {
    id: "JS-2026-1003",
    title: "Row of 4 Streetlights Non-Functional along Residential Ring Road",
    description:
      "The entire stretch of streetlights from crossroad 4 to 8 has been completely blacked out for the last five nights. Women and elderly residents feel unsafe walking in the dark.",
    category: "STREETLIGHT",
    issue: "Non-Functional Streetlights",
    priority: "MEDIUM",
    department: "Electrical & Public Lighting Department",
    summary:
      "Continuous blackout of four pole-mounted streetlamps causing safety concern on residential collector road.",
    recommendedAction:
      "Inspect phase power line and automatic timer sensor; replace faulty LED luminaires.",
    location: {
      address: "Outer Ring Road, 5th Cross, Shanti Nagar, Ward 9",
      latitude: 12.9716,
      longitude: 77.5946,
      city: "Bengaluru",
      landmark: "Near Banyan Tree Children's Park",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    status: "REPORTED",
    citizenName: "Ramesh Nayak",
    citizenPhone: "+91 94480 33219",
    createdAt: "2026-09-28T21:40:00.000Z",
    updatedAt: "2026-09-28T21:40:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-28T21:40:00.000Z",
        note: "Complaint submitted via web portal. Automated lighting ticket created.",
        updatedBy: "System (Citizen Submission)",
      },
    ],
  },
  {
    id: "JS-2026-1004",
    title: "High-Pressure Underground Main Water Line Burst",
    description:
      "Drinking water pipeline has fractured underground and clean drinking water is gushing out like a fountain onto the main road since 5 AM. Thousands of gallons are being wasted and water pressure in households is zero.",
    category: "WATER",
    issue: "Pipeline Rupture & Fresh Water Wastage",
    priority: "CRITICAL",
    department: "Water Supply & Sewerage Board",
    summary:
      "High volume pipeline burst wasting potable water supply and flooding vehicular roadway.",
    recommendedAction:
      "Immediately shut off feeder valve #4B, deploy hydraulic repair team to excavate and clamp pipe rupture.",
    location: {
      address: "Plot 42, Civil Lines Road, Near Shivaji Circle, Ward 3",
      latitude: 19.076,
      longitude: 72.8777,
      city: "Mumbai",
      landmark: "Adjacent to Bank of India ATM",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80",
    status: "IN_PROGRESS",
    citizenName: "Sanjay Joshi",
    citizenPhone: "+91 99201 44558",
    createdAt: "2026-09-29T05:15:00.000Z",
    updatedAt: "2026-09-29T06:30:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-29T05:15:00.000Z",
        note: "Critical water supply grievance received. Auto-escalated due to CRITICAL priority flag.",
        updatedBy: "System (Gemini Triage)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-29T05:35:00.000Z",
        note: "Emergency Water Board squad dispatched.",
        updatedBy: "Disaster Response Cell",
      },
      {
        status: "IN_PROGRESS",
        timestamp: "2026-09-29T06:30:00.000Z",
        note: "Main junction valve isolated. Excavation underway.",
        updatedBy: "Maintenance Engineer M. Rao",
      },
    ],
  },
  {
    id: "JS-2026-1005",
    title: "Choked Storm Water Drain Causing Stagnant Sewage Overflow",
    description:
      "The pre-monsoon storm drain is clogged solid with plastic bags, silt, and construction waste. Black filthy water is spilling onto the street and front yards of homes, causing mosquito breeding and severe dengue risk.",
    category: "DRAINAGE",
    issue: "Blocked Stormwater Drain & Sewage Backflow",
    priority: "HIGH",
    department: "Drainage & Sewerage Department",
    summary:
      "Drain choke causing stagnant backwater spillover near residential housing clusters.",
    recommendedAction:
      "Deploy suction super-sucker tanker and manual desilting workers to de-clog culvert.",
    location: {
      address: "Lane 3, Teachers Colony, Old City Area, Ward 18",
      latitude: 17.385,
      longitude: 78.4867,
      city: "Hyderabad",
      landmark: "Near Govt Primary School",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80",
    status: "ASSIGNED",
    citizenName: "Fatima Begum",
    citizenPhone: "+91 93910 88712",
    createdAt: "2026-09-28T16:20:00.000Z",
    updatedAt: "2026-09-28T18:00:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-28T16:20:00.000Z",
        note: "Complaint filed with geolocation coordinates.",
        updatedBy: "System (Citizen Submission)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-28T18:00:00.000Z",
        note: "Assigned to Ward 18 Drainage Superintendent.",
        updatedBy: "Zonal Municipal Office",
      },
    ],
  },
  {
    id: "JS-2026-1006",
    title: "Collapsed Concrete Road Slab on Canal Bridge Approach",
    description:
      "The concrete approach slab leading to the small canal bridge has caved in on one side by over a foot. Cars are scraping their bottom and heavy trucks could cause the entire section to collapse.",
    category: "ROADS",
    issue: "Structural Road Cave-In",
    priority: "CRITICAL",
    department: "Public Works Department (PWD)",
    summary:
      "Bridge approach pavement settlement threatening structural collapse under heavy vehicular load.",
    recommendedAction:
      "Cordon off lane with reflective safety barriers; execute sub-base stabilization and RCC re-casting.",
    location: {
      address: "Canal Link Road, Bridge 3, Krishnanagar, Ward 31",
      latitude: 22.5726,
      longitude: 88.3639,
      city: "Kolkata",
      landmark: "50m before Canal Sluice Gate",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    status: "IN_PROGRESS",
    citizenName: "Subhash Banerjee",
    citizenPhone: "+91 98300 76543",
    createdAt: "2026-09-27T14:00:00.000Z",
    updatedAt: "2026-09-28T09:30:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-27T14:00:00.000Z",
        note: "Registered as Critical Infrastructure safety issue by citizen.",
        updatedBy: "System (Citizen Submission)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-27T15:00:00.000Z",
        note: "Routed to PWD Bridges & Roads Division.",
        updatedBy: "City Command Centre",
      },
      {
        status: "IN_PROGRESS",
        timestamp: "2026-09-28T09:30:00.000Z",
        note: "Structural engineer inspected site. Temporary diversion established.",
        updatedBy: "Executive Engineer Ghosh",
      },
    ],
  },
  {
    id: "JS-2026-1007",
    title: "Dangling Live Electric Cable near Bus Stop Shelter",
    description:
      "An overhead high-tension distribution wire snapped during yesterday's thunderstorm and is hanging barely 4 feet from the ground right next to the crowded city bus shelter. Sparks were seen earlier.",
    category: "ELECTRICITY",
    issue: "Snapped Overhead Live Wire",
    priority: "CRITICAL",
    department: "State Electricity Distribution Company",
    summary:
      "Snapped electrical conductor wire dangling at head height in dense pedestrian transit point.",
    recommendedAction:
      "Emergency trip substation circuit, secure area perimeter, repair and re-tension conductor.",
    location: {
      address: "City Bus Stop #12, Station Road, Ward 5",
      latitude: 23.0225,
      longitude: 72.5714,
      city: "Ahmedabad",
      landmark: "Next to Railway Station West Gate",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
    status: "RESOLVED",
    citizenName: "Mehul Patel",
    citizenPhone: "+91 98250 99881",
    createdAt: "2026-09-26T17:40:00.000Z",
    updatedAt: "2026-09-26T20:15:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-26T17:40:00.000Z",
        note: "High priority electric hazard reported by commuter.",
        updatedBy: "System (Citizen Submission)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-26T17:50:00.000Z",
        note: "Urgent emergency squad dispatched.",
        updatedBy: "Power Grid Central Dispatch",
      },
      {
        status: "IN_PROGRESS",
        timestamp: "2026-09-26T18:30:00.000Z",
        note: "Substation isolated line. Linemen working on replacement.",
        updatedBy: "Lineman Team A",
      },
      {
        status: "RESOLVED",
        timestamp: "2026-09-26T20:15:00.000Z",
        note: "Snapped wire replaced, tested and re-energized safely. Public hazard eliminated.",
        updatedBy: "Safety Inspector V. Shah",
      },
    ],
  },
  {
    id: "JS-2026-1008",
    title: "Illegal Construction Debris Dumped on Public Walkway and Garden",
    description:
      "A commercial contractor has illegally dumped two truckloads of broken concrete slabs, tiles, and plaster dust right on the public pedestrian pavement and the edge of the municipal park.",
    category: "PUBLIC_SAFETY",
    issue: "Illegal Debris Dumping & Encroachment",
    priority: "MEDIUM",
    department: "Town Planning & Anti-Encroachment Cell",
    summary:
      "Illegal dumping of construction & demolition (C&D) waste blocking public sidewalk access.",
    recommendedAction:
      "Issue fine/notice to identified builder; clear debris using municipal JCB loader.",
    location: {
      address: "Opposite Green Valley Society, Ring Road Sector 19",
      latitude: 13.0827,
      longitude: 80.2707,
      city: "Chennai",
      landmark: "Near Municipal Public Garden Gate",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    status: "RESOLVED",
    citizenName: "Karthik Subramanian",
    citizenPhone: "+91 98401 22345",
    createdAt: "2026-09-25T11:00:00.000Z",
    updatedAt: "2026-09-26T16:00:00.000Z",
    timeline: [
      {
        status: "REPORTED",
        timestamp: "2026-09-25T11:00:00.000Z",
        note: "Complaint lodged with photograph attachment.",
        updatedBy: "System (Citizen Submission)",
      },
      {
        status: "ASSIGNED",
        timestamp: "2026-09-25T13:30:00.000Z",
        note: "Handed over to Ward Enforcement Officer.",
        updatedBy: "Zonal Commissioner",
      },
      {
        status: "IN_PROGRESS",
        timestamp: "2026-09-26T10:00:00.000Z",
        note: "JCB and dumpers mobilized for clearing site.",
        updatedBy: "C&D Disposal Unit",
      },
      {
        status: "RESOLVED",
        timestamp: "2026-09-26T16:00:00.000Z",
        note: "Footpath cleared and restored. Penalty notice issued to perpetrator.",
        updatedBy: "Town Planning Inspector",
      },
    ],
  },
];

export const DEMO_PRESET_COMPLAINTS = [
  {
    title: "Deep Pothole outside College Gate",
    category: "ROADS",
    description:
      "There is a huge pothole outside my college main gate on MG Road. It is dangerous for two-wheelers and two students almost fell yesterday during the evening rush.",
    location: "Near Gate 2, Government Engineering College, MG Road, Ward 14",
  },
  {
    title: "Overflowing Garbage near Vegetable Market",
    category: "SANITATION",
    description:
      "The community garbage bin at the market corner has been overflowing for four days. Animals are scattering rotting waste on the road and the stench is unbearable.",
    location: "Subhash Chowk Mandi, Sector 7, Ward 22",
  },
  {
    title: "Broken Streetlights in Colony",
    category: "STREETLIGHT",
    description:
      "Four consecutive streetlights on 5th Cross Road have been non-functional for nearly a week. The entire street is pitch dark, making women and elderly residents feel unsafe.",
    location: "Outer Ring Road, 5th Cross, Shanti Nagar, Ward 9",
  },
  {
    title: "Burst Drinking Water Pipeline",
    category: "WATER",
    description:
      "An underground main water pipe has burst and fresh clean water is shooting out onto the street. Thousands of liters are being wasted while our colony taps have zero water.",
    location: "Plot 42, Civil Lines Road, Near Shivaji Circle, Ward 3",
  },
  {
    title: "Clogged Drainage Overflowing onto Road",
    category: "DRAINAGE",
    description:
      "The storm drain is blocked with plastic waste and black sewage water is overflowing onto the pedestrian pathway and entering residential gates, spreading terrible odor and mosquitoes.",
    location: "Lane 3, Teachers Colony, Old City Area, Ward 18",
  },
];
