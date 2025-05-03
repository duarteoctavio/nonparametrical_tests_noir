fn abs(x: i16) -> u16 {
    let mut output = x;
    if (x <=0) {
        output = - output;
    }
    output as u16
}

fn is_abs_sorted<let N: u32>(array: [ i16; N ]) {
    for i in 1..array.len() {
        // println("element");
        // println(i);
        // println(abs( array[i] ));
        // println(abs( array[i-1] ));
        assert( abs( array[i] ) >= abs( array[i-1] ), "This array is not sorted by absolute value as the test requires.");
    };
}

fn set_contains_elem<let N: u32>(set: [i16;N] , elem: i16 ) -> bool {
    let mut output = false;
    for e in set {
        if e == elem {
            output = true;
        }
    }
    output
}

struct SamplePosition {
    sample_value: i16,
    amount_of_samples: i16,
    first_index: i16,
    last_index: i16,
}

// NOTE while it's tempting to use a remainder array, it would have the same length padded with 0s, as we are forced to use a fixed size. Therefore, we opt for just reusing the same array.
// NOTE only works on sorted arrays.
fn group_equals<let N: u32>(sample_value: i16, array: [i16;N]) -> SamplePosition {
    let mut amount: i16 = 0;
    let mut first_index: i16 = 0;
    let mut last_index: i16 = 0;
    let mut bumped_on = false;
    for index in 0..array.len() {
        let current = array[index];
        if current == sample_value {
            amount+=1;
            last_index = index as i16;
            if !bumped_on {
                bumped_on = true;
                first_index = index as i16;
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

/// This function will find the average between a range of numbers (min and max, inclusive on both ends). Thanks to integers being integers we can rely on a close summation formula and avoid using an `unconstrained` function.
fn range_average(min: i16, max: i16) -> i16 {
    let zero_to_min_sum: i16 = ( ( min - 1 ) * (min) ) / 2;
    let zero_to_max_sum: i16 = ( max * (max + 1) ) / 2;
    let range_sum: i16 = zero_to_max_sum - zero_to_min_sum;
    let size: i16 = max - min + 1;
    let average: i16 = range_sum / size;
    average
}

fn assign_wilcox_scores<let N: u32>(sorted_array: [i16; N]) -> [i16; N] {
    // following functions assume sorted data.
    is_abs_sorted(sorted_array);

    let sample_positions = sorted_array.map(|e| group_equals(e, sorted_array));
    // we need to skip the repeated sample positions.
    let mut scores_slice: [i16] = [];
    for positions in sample_positions {
        let average = range_average(positions.first_index + 1, positions.last_index + 1);
        scores_slice = scores_slice.push_back(average);
    }
    let scores: [i16; N] = scores_slice.as_array();
    scores
}

pub fn get_wilcoxon_t_statistic<let N: u32>(dataset: [i16; N]) -> i16 {
    let scores = assign_wilcox_scores(dataset);
    let mut statistic = 0;
    for i in 0..dataset.len() {
        if (dataset[i] > 0) {
            statistic += scores[i];
        }
    };
    statistic
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
fn test_range_average() {
    let expected: i16 = 5;
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
    // println(f"statistic is {statistic}");
    assert(statistic == 26)
}
