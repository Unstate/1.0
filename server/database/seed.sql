INSERT INTO books (id, title, author, description, genre, publication_year, page_count, cover_url)
VALUES
('11111111-1111-4111-8111-111111111111', 'The Hobbit', 'J. R. R. Tolkien', 'A reluctant adventurer leaves his quiet home to help reclaim a lost kingdom.', 'Fantasy', 1937, 310, NULL),
('22222222-2222-4222-8222-222222222222', 'Pride and Prejudice', 'Jane Austen', 'Elizabeth Bennet navigates family expectations, first impressions, and love.', 'Romance', 1813, 432, NULL),
('33333333-3333-4333-8333-333333333333', 'Frankenstein', 'Mary Shelley', 'A scientist creates life and confronts the consequences of abandoning his creation.', 'Gothic fiction', 1818, 280, NULL),
('44444444-4444-4444-8444-444444444444', 'The Time Machine', 'H. G. Wells', 'An inventor travels into the distant future and discovers a divided humanity.', 'Science fiction', 1895, 118, NULL),
('55555555-5555-4555-8555-555555555555', 'The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', 'A collection of mysteries investigated by Sherlock Holmes and Dr. Watson.', 'Mystery', 1892, 307, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO books (id, title, author, description, genre, publication_year, page_count, cover_url)
VALUES
('ee622522-b3b0-445e-b481-f73d84cb0c47', 'Dune', 'Frank Herbert', 'A young heir finds his destiny on a desert planet where water and power shape every choice.', 'Science fiction', 1965, 688, NULL),
('166baa06-bcd5-4850-8611-71461f2572ac', 'Nineteen Eighty-Four', 'George Orwell', 'A man tries to preserve his private thoughts in a society built on surveillance.', 'Dystopia', 1949, 328, NULL),
('617dac6d-fde8-4380-98ab-c6cf040cbb58', 'Fahrenheit 451', 'Ray Bradbury', 'A fireman whose job is to destroy books begins questioning his world.', 'Dystopia', 1953, 256, NULL),
('46dc1c28-c225-4566-9868-98d38179811b', 'Brave New World', 'Aldous Huxley', 'An outsider challenges a society that has traded freedom for engineered happiness.', 'Dystopia', 1932, 311, NULL),
('3a883634-0703-467f-a604-ea2354124085', 'The Martian', 'Andy Weir', 'An astronaut stranded on Mars uses science and persistence to survive.', 'Science fiction', 2011, 369, NULL),
('d9cc295f-f08e-4110-9d71-b2ce02000373', 'Foundation', 'Isaac Asimov', 'A scientific community attempts to shorten a coming age of galactic darkness.', 'Science fiction', 1951, 255, NULL),
('47804f5e-4ba1-46b5-b7af-70348ed1b35e', 'Solaris', 'Stanislaw Lem', 'Scientists studying a mysterious ocean confront manifestations of their memories.', 'Science fiction', 1961, 204, NULL),
('3e3a6eb3-c024-4aae-8765-a7fef51c8236', 'The Left Hand of Darkness', 'Ursula K. Le Guin', 'An envoy learns to understand an unfamiliar culture on a frozen planet.', 'Science fiction', 1969, 304, NULL),
('1a672a9b-2ae4-4264-8ee5-1a60336bdf91', 'A Wizard of Earthsea', 'Ursula K. Le Guin', 'A young wizard must face the shadow released by his own ambition.', 'Fantasy', 1968, 205, NULL),
('fc6d3a1f-ebf9-4fec-8859-a6f1233dd0ca', 'The Fellowship of the Ring', 'J. R. R. Tolkien', 'An unlikely company sets out to destroy a ring of dangerous power.', 'Fantasy', 1954, 423, NULL),
('71c28009-b6ac-41fa-a29b-484c16ca880c', 'The Last Unicorn', 'Peter S. Beagle', 'A unicorn leaves her forest to discover what happened to the rest of her kind.', 'Fantasy', 1968, 294, NULL),
('80022315-83ea-441e-8f0e-ba6ef6305982', 'Howls Moving Castle', 'Diana Wynne Jones', 'A young woman under a spell finds unexpected refuge in a wandering castle.', 'Fantasy', 1986, 302, NULL),
('a03cdaec-8c64-43c3-9fa3-37ae7fe4d027', 'Jane Eyre', 'Charlotte Bronte', 'An independent young governess searches for belonging without surrendering her principles.', 'Romance', 1847, 532, NULL),
('fae1b9af-0150-40e5-8bf1-33fae588c386', 'Sense and Sensibility', 'Jane Austen', 'Two sisters navigate loss, social expectations, and very different approaches to love.', 'Romance', 1811, 409, NULL),
('7444853c-2738-4bfd-aaa3-fc3274a70676', 'Dracula', 'Bram Stoker', 'A group of friends pieces together evidence of an ancient threat.', 'Gothic fiction', 1897, 418, NULL),
('e8ab9786-4808-4610-ade0-ffb06173be0d', 'The Picture of Dorian Gray', 'Oscar Wilde', 'A portrait bears the marks of a life its subject refuses to acknowledge.', 'Gothic fiction', 1890, 254, NULL),
('c60ab65f-0ec1-4501-8433-44550aa0dad1', 'Murder on the Orient Express', 'Agatha Christie', 'A detective investigates a murder aboard a train trapped in the snow.', 'Mystery', 1934, 256, NULL),
('a8e8fd26-760b-48e4-ba10-410cdd428a12', 'The Hound of the Baskervilles', 'Arthur Conan Doyle', 'Sherlock Holmes examines a family legend on a fogbound moor.', 'Mystery', 1902, 256, NULL),
('2a51fe5b-88a1-4019-b455-e5ba1d55c880', 'The Little Prince', 'Antoine de Saint-Exupery', 'A traveller from a small planet asks simple questions about what matters.', 'Fable', 1943, 96, NULL),
('faa693d4-d53d-417f-9fe8-d51c3372945c', 'The Old Man and the Sea', 'Ernest Hemingway', 'An ageing fisherman struggles with a great fish far from shore.', 'Literary fiction', 1952, 127, NULL)
ON CONFLICT (id) DO NOTHING;
