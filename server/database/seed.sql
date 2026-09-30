INSERT INTO books (id, title, author, description, genre, publication_year, page_count, cover_url)
VALUES
('11111111-1111-4111-8111-111111111111', 'The Hobbit', 'J. R. R. Tolkien', 'A reluctant adventurer leaves his quiet home to help reclaim a lost kingdom.', 'Fantasy', 1937, 310, NULL),
('22222222-2222-4222-8222-222222222222', 'Pride and Prejudice', 'Jane Austen', 'Elizabeth Bennet navigates family expectations, first impressions, and love.', 'Romance', 1813, 432, NULL),
('33333333-3333-4333-8333-333333333333', 'Frankenstein', 'Mary Shelley', 'A scientist creates life and confronts the consequences of abandoning his creation.', 'Gothic fiction', 1818, 280, NULL),
('44444444-4444-4444-8444-444444444444', 'The Time Machine', 'H. G. Wells', 'An inventor travels into the distant future and discovers a divided humanity.', 'Science fiction', 1895, 118, NULL),
('55555555-5555-4555-8555-555555555555', 'The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', 'A collection of mysteries investigated by Sherlock Holmes and Dr. Watson.', 'Mystery', 1892, 307, NULL)
ON CONFLICT (id) DO NOTHING;
