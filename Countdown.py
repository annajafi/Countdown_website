from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

other_countdown = []

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/countdown")
def countdown():
    show_modal = len(other_countdown) == 0
    main_countdown = other_countdown[0] if other_countdown else None

    return render_template(
        "countdown.html",
        counters=other_countdown,
        main_countdown=main_countdown,
        show_modal=show_modal
    )

@app.route("/submit-form-data", methods=["POST"])
def submit_form_data():
    countdown_name = request.form.get("countdown_name")
    countdown_date = request.form.get("countdown_date")
    countdown_time = request.form.get("countdown_time")
    weekdays_only = request.form.get("weekdays_only") == "yes"

    new_countdown = {
        "name": countdown_name,
        "date": countdown_date,
        "time": countdown_time,
        "weekdays_only": weekdays_only
    }

    other_countdown.append(new_countdown)

    return redirect(url_for("countdown"))

if __name__ == "__main__":
    app.run(debug=True)