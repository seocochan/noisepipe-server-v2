--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._migrations
(
    id          integer NOT NULL,
    name        character varying(255),
    executed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public._migrations
    OWNER TO postgres;

--
-- Name: _migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._migrations_id_seq
    OWNER TO postgres;

--
-- Name: _migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._migrations_id_seq OWNED BY public._migrations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users
(
    id          character varying(255)      NOT NULL,
    created_at  timestamp(0) with time zone NOT NULL,
    updated_at  timestamp(0) with time zone NOT NULL,
    email       character varying(255)      NOT NULL,
    country     character varying(255)      NOT NULL,
    postal_code character varying(255)      NOT NULL,
    street      character varying(255)      NOT NULL
);


ALTER TABLE public.users
    OWNER TO postgres;

--
-- Name: _migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._migrations
    ALTER COLUMN id SET DEFAULT nextval('public._migrations_id_seq'::regclass);


--
-- Data for Name: _migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._migrations (id, name, executed_at) FROM stdin;
1	Migration20210731142821.ts	2021-07-31 23:28:21.928004+09
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, email, country, postal_code, street) FROM stdin;
123e4567-e89b-12d3-a456-426614174000	2021-07-31 04:53:00+09	2021-07-31 04:53:00+09	seoco@gmail.com	kr	12345	68
\.


--
-- Name: _migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._migrations_id_seq', 1, true);


--
-- Name: _migrations _migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._migrations
    ADD CONSTRAINT _migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

