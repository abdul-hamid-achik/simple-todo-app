from app import create_app, db

current_app = create_app()

if __name__ == "__main__":
    db.cli.run()
