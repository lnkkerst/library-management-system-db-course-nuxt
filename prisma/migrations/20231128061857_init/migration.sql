BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NCHAR(36) NOT NULL,
    [name] NVARCHAR(64) NOT NULL,
    [hashedPassword] NVARCHAR(96) NOT NULL,
    [userTypeId] NCHAR(36) NOT NULL,
    [permission] NVARCHAR(64) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [User_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [User_hashedPassword_key] UNIQUE NONCLUSTERED ([hashedPassword])
);

-- CreateTable
CREATE TABLE [dbo].[UserType] (
    [id] NCHAR(36) NOT NULL,
    [name] NVARCHAR(64) NOT NULL,
    CONSTRAINT [UserType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserType_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reader] (
    [id] NCHAR(36) NOT NULL,
    [libraryCardId] NVARCHAR(36),
    [hashedPassword] NVARCHAR(96) NOT NULL,
    [name] NVARCHAR(32) NOT NULL,
    [gender] NVARCHAR(16) NOT NULL,
    [readerTypeId] NCHAR(36) NOT NULL,
    [organization] NVARCHAR(64),
    [phoneNumber] NVARCHAR(16),
    [email] NVARCHAR(64),
    [registerAt] DATETIME NOT NULL CONSTRAINT [Reader_registerAt_df] DEFAULT CURRENT_TIMESTAMP,
    [note] NTEXT,
    CONSTRAINT [Reader_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Reader_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Reader_libraryCardId_key] UNIQUE NONCLUSTERED ([libraryCardId])
);

-- CreateTable
CREATE TABLE [dbo].[ReaderType] (
    [id] NCHAR(36) NOT NULL,
    [name] NVARCHAR(64) NOT NULL,
    [bookQuota] INT NOT NULL,
    [borrowPeriod] INT NOT NULL,
    CONSTRAINT [ReaderType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ReaderType_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Book] (
    [id] NCHAR(36) NOT NULL,
    [name] NVARCHAR(64) NOT NULL,
    [isbn] NVARCHAR(16) NOT NULL,
    [author] NVARCHAR(32) NOT NULL,
    [publisher] NVARCHAR(64) NOT NULL,
    [publishAt] DATETIME NOT NULL,
    [bookTypeId] NCHAR(36) NOT NULL,
    [indexNumber] NVARCHAR(32) NOT NULL,
    [price] MONEY NOT NULL,
    [pages] INT NOT NULL,
    [summary] NTEXT NOT NULL,
    [amount] INT NOT NULL CONSTRAINT [Book_amount_df] DEFAULT 0,
    CONSTRAINT [Book_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Book_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BookType] (
    [id] NCHAR(36) NOT NULL,
    [name] NVARCHAR(64) NOT NULL,
    CONSTRAINT [BookType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BookType_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BorrowRecord] (
    [readerId] NCHAR(36) NOT NULL,
    [bookId] NCHAR(36) NOT NULL,
    [borrowDate] DATETIME NOT NULL CONSTRAINT [BorrowRecord_borrowDate_df] DEFAULT CURRENT_TIMESTAMP,
    [returnDate] DATETIME NOT NULL CONSTRAINT [BorrowRecord_returnDate_df] DEFAULT CURRENT_TIMESTAMP,
    [status] INT NOT NULL CONSTRAINT [BorrowRecord_status_df] DEFAULT 0,
    [id] NCHAR(36) NOT NULL,
    CONSTRAINT [BorrowRecord_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BorrowRecord_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BookingRecord] (
    [id] NCHAR(36) NOT NULL,
    [bookingDate] DATETIME NOT NULL,
    [bookId] NCHAR(36) NOT NULL,
    [readerId] NCHAR(36) NOT NULL,
    CONSTRAINT [BookingRecord_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BookingRecord_id_key] UNIQUE NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_userTypeId_fkey] FOREIGN KEY ([userTypeId]) REFERENCES [dbo].[UserType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reader] ADD CONSTRAINT [Reader_readerTypeId_fkey] FOREIGN KEY ([readerTypeId]) REFERENCES [dbo].[ReaderType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [Book_bookTypeId_fkey] FOREIGN KEY ([bookTypeId]) REFERENCES [dbo].[BookType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BorrowRecord] ADD CONSTRAINT [BorrowRecord_readerId_fkey] FOREIGN KEY ([readerId]) REFERENCES [dbo].[Reader]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BorrowRecord] ADD CONSTRAINT [BorrowRecord_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[Book]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingRecord] ADD CONSTRAINT [BookingRecord_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[Book]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingRecord] ADD CONSTRAINT [BookingRecord_readerId_fkey] FOREIGN KEY ([readerId]) REFERENCES [dbo].[Reader]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
