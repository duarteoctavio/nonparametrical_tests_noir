fn abs(x: i8) -> u8 {
    let mut output = x;
    if (x <=0) {
        output = - output;
    }
    output as u8
}

fn is_abs_sorted<let N: u32>(array: [ i8; N ]) {
    for i in 1..array.len() {
        assert( abs( array[i] ) >= abs( array[i-1] ), "This array is not sorted by absolute value as the test requires.");
    };
}

fn set_contains_elem<let N: u32>(set: [i8;N] , elem: i8 ) -> bool {
    let mut output = false;
    for e in set {
        if e == elem {
            output = true
        }
    }
    output
}

struct SamplePosition {
    sample_value: i8,
    amount_of_samples: i8,
    first_index: i8,
    last_index: i8,
}

// NOTE while it's tempting to use a remainder array, it would have the same length padded with 0s, as we are forced to use a fixed size. Therefore, we opt for just reusing the same array.
// NOTE only works on sorted arrays.
fn group_equals<let N: u32>(sample_value: i8, array: [i8;N]) -> SamplePosition {
    let mut amount: i8 = 0;
    let mut first_index: i8 = 0;
    let mut last_index: i8 = 0;
    let mut bumped_on = false;
    for index in 0..array.len() {
        let current = array[index];
        if current == sample_value {
            amount+=1;
            last_index = index as i8;
            if !bumped_on {
                bumped_on = true;
                first_index = index as i8;
            };
        }
    };
    SamplePosition {
        sample_value,
        amount_of_samples: amount,
        first_index,
        last_index
    }
}

fn average(slice: [i8]) -> i8 {
    slice.reduce(|a,b| a + b) / ( slice.len() as i8 )
}

fn integer_range(min: i8, max: i8) -> [i8] {
    let mut output: [i8] = &[];
    for elem in min..=max {
        output = output.push_back(elem);
    };
    output
}

fn range_average(min: i8, max: i8) -> [i8] {
    let mut output: [i8] = &[];
    let integers_array: [i8] = integer_range(min, max);
    let average: i8 = average(integers_array);
    for _ in min..=max {
        output = output.push_back(average);
    };
    output
}

fn assign_wilcox_scores<let N: u32>(sorted_array: [i8; N]) -> [i8; N] {
    // following functions assume sorted data.
    is_abs_sorted(sorted_array);

    let sample_positions = sorted_array.map(|e| group_equals(e, sorted_array));
    // we need to skip the repeated sample positions.
    // TODO find something better than this horrible hack to initialize this variable, is there a NaN?
    let mut output = [0 ; N];
    for positions in sample_positions {
        let mut values = range_average(positions.first_index + 1, positions.last_index + 1);
        for index in positions.first_index..=positions.last_index {
            let (elem, remainder) = values.pop_front();
            // print(f"current remainder {remainder}");
            values = remainder;
            output[index] = elem;
        }
    };
    output
}

fn get_wilcoxon_t_statistic<let N: u32>(dataset: [i8; N]) -> i8 {
    let scores = assign_wilcox_scores(dataset);
    let mut statistic = 0;
    for i in 0..dataset.len() {
        if (dataset[i] > 0) {
            statistic += scores[i];
        }
    };
    statistic
}

fn main(statistic_threshold: pub i8, dataset: [i8; 9]) {
    let statistic = get_wilcoxon_t_statistic(dataset);
    assert( statistic >= statistic_threshold );
}

#[test]
fn test_abs() {
    assert(8 == abs(8));
    assert(8 == abs(-8));
}

#[test]
fn test_is_abs_sorted() {
    is_abs_sorted([0,1,2,3,4]);
    is_abs_sorted([-1,-2,3,-5,5,5])
}
#[test(should_fail)]
fn test_is_abs_sorted_fails() {
    is_abs_sorted([6,1,2,3,4]);
    is_abs_sorted([1,-2,3,5,5,5])
}

#[test]
fn test_group_equals() {
    let position = group_equals(2, [1,2,2,3,4]);
    assert(position.amount_of_samples == 2);
}

#[test]
fn test_set_contains_elem() {
    let example = [1,2,3,4,5];
    assert( set_contains_elem(example,1) );
}

#[test]
fn test_average() {
    assert(average([4,5,6]) == 5);
    assert(average([4]) == 4);
}

#[test]
fn test_integer_range() {
    let expected: [i8; 3] = [4,5,6];
    let observed = integer_range(4,6);
    assert( observed.as_array() == expected )
}

#[test]
fn test_range_average() {
    let expected: [i8] = [5,5,5];
    let range = range_average(4,6);
    assert( range == expected );
}

#[test]
fn test_assign_wilcox_scores() {
    let scores = assign_wilcox_scores([1,2,3,5,5,5]);
    assert(scores == [1,2,3,5,5,5]);
}

#[test]
fn statistic_calculation() {
    let statistic = get_wilcoxon_t_statistic([ 5, 5, -7, -9, -10, -12, 15, 17, 20]);
    print(f"statistic is {statistic}");
    assert(statistic == 15)
}

#[test]
fn test_rejection() {
    main(15, [ 5, 5, -7, -9, -10, -12, 15, 17, 20])
}
