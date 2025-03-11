CREATE TABLE [eng].[SchemaVersions](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [ScriptName] [nvarchar](255) NOT NULL,
    [Applied] [datetime2](7) NOT NULL,
    CONSTRAINT [PK_SchemaVersions] PRIMARY KEY CLUSTERED ([Id] ASC)
)