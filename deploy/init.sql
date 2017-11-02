CREATE SEQUENCE common_seq
	INCREMENT 1
	MINVALUE 10000
	MAXVALUE 9223372036854775807
	CACHE 1;

CREATE TABLE public.files (
	id bigint NOT NULL PRIMARY KEY DEFAULT nextval('common_seq'::regclass),
	binary_file oid NOT NULL
)
WITH (
	OIDS=FALSE
);

