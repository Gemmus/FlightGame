class Player:
    def __init__(self, name, new_location, score=0, co2_consumed=0, co2_budget=3500):
        list_of_previous_location = ['EFHK']
        self.name = name
        self.new_location = new_location
        self.score = score
        self.co2_consumed = co2_consumed
        self.co2_budget = co2_budget
        self.current_location = list_of_previous_location[-1]






