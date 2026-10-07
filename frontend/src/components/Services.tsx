import type { ElementType } from "react";

import {
    Baby,
    Brain,
    Droplets,
    HandHeart,
    HeartPulse,
    Microscope,
    ShieldPlus,
    Syringe,
    UserRound,
    Pill,
    Scissors,
    
} from "lucide-react";

const pediatricServices = [
    {
        title: "IPD Pediatric Care",
        description: "Pediatric 24 X 7 emergency facility and pediatric intensive care unit-PICU",
        icon: Baby,

    },
    {
        title: "Neonatal intensive care unit(NICU)",
        description: "NICU care unit with all facility (preterm care, phototherapy, ventilator)",
        icon: Baby,

    },
    {
        title: "Well Baby Clinic",
        description: "Regular health monitoring and preventive care for babies.",
        icon: Baby,
    },
    {
        title: "Vaccination",
        description: "Vaccination services and guidance for children.",
        icon: Syringe,
    },
    {
        title: "Growth & Nutrition",
        description: "Growth assessment and nutrition counselling.",
        icon: HeartPulse,
    },
    {
        title: "Child Development",
        description: "Assessment of Child development.",
        icon: Brain,
    },
    {
        title: "Adolescent Health",
        description: "Care for adolescent and behavioural problems.",
        icon: UserRound,
    },
    {
        title: "Asthma, Allergy & Skin",
        description: "Treatments of Asthama , Allergy and Skin problems",
        icon: ShieldPlus,
    },
    {
        title: "Seizure Clinic",
        description: "Seizure facility is available",
        icon: Brain,
    },
    {
        title: "Genetic Counselling",
        description: "Genetic counselling and guidance when needed.",
        icon: Microscope,
    },
    {
        title: "Blood, Kidney & Endocrine",
        description: "Treatments of Blood,Kidney,Endocrine disorders",
        icon: Droplets,
    },

];

const womenServices = [
    {
        title: "Pregnancy Care",
        description: "Prenatal and postnatal pregnancy care.",
        icon:Baby,
    },
    {
        title: "Delivery",
        description: "Normal and caesarean delivery  facility available.",
        icon: ShieldPlus,
    },
    {
        title: "High Risk Pregnancy Care",
        description: "On time treatment for high risk pregnancy.",
        icon: ShieldPlus,
    },
    {
        title: "Infertility Treatment",
        description: "Diagnosis and treatment for infertility.",
        icon: HandHeart,
    },
    {
        title: "Menstrual Disorders",
        description: "Evaluation and treatment of menstrual health.",
        icon: UserRound,
    },
    {
        title: "Breast & Cervical Health",
        description: "Breast and cervical cancer screening.",
        icon: ShieldPlus,
    },

    {
        title: "Contraception",
        description: "Contraceptive counselling and services.",
        icon: Pill,
    },
    {
        title: "STI Diagnosis Treatment",
        description: "Diagnosis and treatment of sexually transmitted infections.",
        icon: ShieldPlus,
    },
    {
        title: "Fibroid Surgery",
        description: "Fibroid surgery service available. ",
        icon:Scissors,
    },
];

function ServiceCard({
    title,
    description,
    icon: Icon,
}: {
    title: string;
    description: string;
    icon: ElementType;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Icon size={22} />
            </div>

            <h4 className="mt-5 font-bold text-gray-900">
                {title}
            </h4>

            <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
            </p>
        </div>
    );
}

function Services() {
    return (
        <section id="services" className="bg-white px-5 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                        Our Services
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Comprehensive Healthcare Services
                    </h2>

                    <p className="mt-5 leading-7 text-gray-600">
                        Specialized healthcare services for children, mothers and
                        families.
                    </p>
                </div>

                {/* Pediatrics */}
                <div className="mt-16">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                            Dr. Parikshit Chohatkar
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-gray-900">
                            Pediatric & Child Care
                        </h3>

                        <p className="mt-2 max-w-2xl text-gray-600">
                            Healthcare services for infants, children and adolescents.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {pediatricServices.map((service) => (
                            <ServiceCard
                                key={service.title}
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                            />
                        ))}
                    </div>
                </div>

                {/* Women's health */}
                <div className="mt-20">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                            Dr. Vaishnavi Chohatkar
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-gray-900">
                            Women's Health & Gynaecology
                        </h3>

                        <p className="mt-2 max-w-2xl text-gray-600">
                            Specialized care for women through different stages of life.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {womenServices.map((service) => (
                            <ServiceCard
                                key={service.title}
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Services;