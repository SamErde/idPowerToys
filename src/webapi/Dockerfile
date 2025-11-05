FROM mcr.microsoft.com/dotnet/aspnet:8.0@sha256:95f47686d234619398df242962148324129b4400aa185986fd571da4e20e24bc AS base
WORKDIR /app
EXPOSE 5269

# ENV ASPNETCORE_URLS=http://+:5252
ENV ASPNETCORE_HTTP_PORTS=5269

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0@sha256:4632e98dc703311ca09d0c37170fe70ad4ba334bd88a841c78cbcc9d29994b2c AS build
ARG configuration=Release
WORKDIR /src
COPY ["src/webapi/webapi.csproj", "src/webapi/"]
RUN dotnet restore "src/webapi/webapi.csproj"
COPY . .
WORKDIR "/src/src/webapi"
RUN dotnet build "webapi.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "webapi.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "webapi.dll"]
